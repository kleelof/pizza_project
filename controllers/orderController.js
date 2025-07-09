const Order = require('../models/order');
const Inventory = require('../models/inventory');

// -------------------------------------------
// GET  /order/create  →  show Add-Order form
// -------------------------------------------
exports.getCreateForm = async (req, res) => {
  try {
    const allItems = await Inventory.find();
    const pizzas  = allItems.filter(item => item.type === 'pizza');
    const drinks  = allItems.filter(item => item.type === 'drink');
    res.render('order/add', { pizzas, drinks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading form');
  }
};

// -------------------------------------------
// POST /order/create  →  create new order
// -------------------------------------------
exports.create = async (req, res) => {
  try {
    // 🌟 1) pull fields coming from the form
    const { customerName, pizza, drink, quantity, notes } = req.body;

    // 🌟 2) look-up selected inventory items
    const itemIds = [pizza, drink].filter(id => id);  // remove empty strings
    const selectedItems = await Inventory.find({ _id: { $in: itemIds } });

    // 🌟 3) calculate price
    let total = 0;
    selectedItems.forEach(item => { total += item.price; });
    total *= Number(quantity || 1);

    // 🌟 4) split pizza / drink IDs for storage (keep IDs in DB)
    const newOrder = new Order({
      customerName,               // add this field to Order model if missing
      pizza,                      // inventory _id
      drink: drink || null,       // may be null if none chosen
      quantity: Number(quantity), // add to Order model
      notes,                      // add to Order model
      total,
      completed: false
    });

    await newOrder.save();
    res.redirect('/admin/order');
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(400).send(err.message);
  }
};

// ------------------------------------------------------------------
// (unchanged) Visitor form – you can mirror the same field names here
// ------------------------------------------------------------------
exports.visitorCreate = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      completed: false
    });
    await order.save();
    res.redirect('/thankYouPage');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// ------------------------------------------------------------------
// admin list / delete / view / update methods remain the same
// If you add quantity & notes to Order, remember to surface them in
// showAll(), view(), and the update form.
// ------------------------------------------------------------------