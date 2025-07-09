const Home = require('../models/home');
const Order = require('../models/order');
const Inventory = require('../models/inventory'); // This just uses the schema to query
const path = require('path');

exports.getHomePage = async (req, res) => {
  try {
    const homeData = await Home.findOne().sort({ last_updated: -1 }); // Optional: latest home data
    res.render(path.join(res.locals.templatesPath, 'home', 'home.ejs'), { homeData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading home page.');
  }
};

exports.getAdminPage = async (req, res) => {
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

    res.render(path.join(res.locals.templatesPath, 'home', 'admin.ejs'), { orders: ordersWithNames, inventory: allItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin page.');
  }
};

exports.getLoginPage = async (req, res) => {
  res.render(path.join(res.locals.templatesPath, 'home', 'admin_login.ejs'));
};