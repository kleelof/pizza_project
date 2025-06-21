const Order = require('../models/order');
const path = require('path')

// Create a new order
exports.getCreateForm = async(req, res) => {
  res.render(res.locals.templatesPath + '/order/add.ejs');
}

exports.create = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      completed: false
    });
    const savedOrder = await newOrder.save();
    res.redirect("/orders");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// List all orders
exports.showAll = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    var correctedPath = path.normalize(res.locals.templatesPath + '/order/all.ejs'); //corrects path for operating system
    res.render(correctedPath, { orders });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders.');
  }
}

// Delete an order
exports.delete = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId); // Delete the order by ID
    res.redirect('/orders'); // Redirect to the orders list
  }
  catch (err) {
    console.error(err);
    res.redirect('/orders'); // Redirect to the orders list on error
  }
}

// view an order
exports.view = async (req, res) => {
  try {
    const orderId = req.params.id; // extract order ID from request parameters - /order/:id
    const order = await Order.findById(orderId); // Fetch the order by ID
    if (!order) {
      res.redirect('/orders'); // Redirect if order not found
    }
    res.render(res.locals.templatesPath + '/order/view.ejs', { order });
  } catch (err) {
    console.error(err);
    res.redirect('/orders'); // Redirect to the orders list on error
  }
};

// Update an order
exports.getUpdateForm = async (req, res) => {
  try {
    const orderId = req.params.id; // Extract order ID from request parameters
    const order = await Order.findById(orderId); // Fetch the order by ID
    if (!order) {
      return res.redirect('/orders'); // Redirect if order not found
    }
    res.render(res.locals.templatesPath + '/order/update.ejs', { order }); // Render update form with order data
  } catch (err) {
    console.error(err);
    res.redirect('/orders'); // Redirect to the todos list on error
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
    res.redirect('/orders'); 
  }
};