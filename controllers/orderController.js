const Order = require('../models/order');
const path = require('path') //variable assigned for path normalization, reference line 26
const Inventory = require('../models/inventory'); // This just uses the schema to query

// Create a new order
exports.getCreateForm = async(req, res) => {
  try {
    const allItems = await Inventory.find();
    const pizzas = allItems.filter(item => item.type === 'pizza');
    const drinks = allItems.filter(item => item.type === 'drink');
  // grab inventory items
  // separate into drinks and pizza
  // send them to the add.ejs form
  // put the item ID in the <select> options
    res.render('order/add', { pizzas, drinks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};

exports.create = async (req, res) => {
  try {
    const { customer_name, customer_address, pizza, drink } = req.body;
    const selectedItems = await Inventory.find({
      _id: { $in: [pizza, drink] }
    });

    // Calculate total price
    let total = 0;
    selectedItems.forEach(item => {
      total += item.price;
    });

    const order = new Order({
      customer_name,
      customer_address,
      pizza,
      drink,
      total,
      completed: false
    });



    await order.save();
    res.redirect('/order');
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};


/*
Cam needs to merge his updates into main
you need to pull those updates

getCreateForm -> getVisitorForm
copy add.ejs
<form> change action to /visotor-create
add 2 routes to app.py
app.get('/visitor-create', orderController.getVisitorForm);
app.post('/visitor-create', orderController.visitorCreate)
*/

exports.visitorCreate = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      completed: false
    });
    const savedOrder = await order.save();
    res.redirect("/thankYouPage");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// List all orders
exports.showAll = async (req, res) => {
  try {
    const orders = await Order.find();
    const allItems = await Inventory.find();

    // Map inventory items by _id as string
    const itemsMap = {};
    allItems.forEach(item => {
      itemsMap[item._id.toString()] = item;
    });

    const ordersWithNames = orders.map(order => {
      const pizza = itemsMap[order.pizza];
      const drink = itemsMap[order.drink];

      return {
        ...order.toObject(),
        pizzaName: pizza ? `${pizza.size} ${pizza.name}` : 'Large Pepperoni Pizza',
        drinkName: drink ? drink.name : 'Dr.Pepper',
        total: order.total || 0 //ensure total is not undefined
      };
    });

    res.render('order/all', { orders: ordersWithNames });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving orders");
  }
};

// Delete an order
exports.delete = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId); // Delete the order by ID
    res.redirect('/order'); // Redirect to the orders list
  }
  catch (err) {
    console.error(err);
    res.redirect('/order'); // Redirect to the orders list on error
  }
}

// view an order
exports.view = async (req, res) => {
  try {
    const orderId = req.params.id; // extract order ID from request parameters - /order/:id
    const order = await Order.findById(orderId); // Fetch the order by ID
    if (!order) {
      res.redirect('/order'); // Redirect if order not found
    }
    res.render(res.locals.templatesPath + '/order/view.ejs', { order });
  } catch (err) {
    console.error(err);
    res.redirect('/order'); // Redirect to the orders list on error
  }
};

// Update an order
exports.getUpdateForm = async (req, res) => {
  try {
    const orderId = req.params.id; // Extract order ID from request parameters
    const order = await Order.findById(orderId); // Fetch the order by ID
    if (!order) {
      return res.redirect('/order'); // Redirect if order not found
    }

    const allItems = await Inventory.find();
    const pizzas = allItems.filter(item => item.type === 'pizza');
    const drinks = allItems.filter(item => item.type === 'drink');

    // Pass order, pizzas, and drinks to the view
    res.render(res.locals.templatesPath + '/order/update.ejs', { order, pizzas, drinks }); // Render update form with order data
  } catch (err) {
    console.error(err);
    res.redirect('/order'); // Redirect to the order list on error
  }
};

exports.update = async (req, res) => {
  try {
    const updatedData = req.body; // Get updated data from request body
    const updatedOrder = await Order.findByIdAndUpdate(updatedData.id, updatedData, { new: true }); // Update the order
    console.log('Updated Order:', updatedOrder);
    res.redirect('/order'); 
  } catch (err) {
    console.error(err);
    res.redirect('/order'); 
  }
};