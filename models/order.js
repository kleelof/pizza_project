
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_name: String,
  customer_address: String,
  pizza: String,
  drink: String,
  total: Number,
  completed: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
