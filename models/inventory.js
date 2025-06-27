
const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: String,
  type: String, //drink, pizza
  price: Number,
  size: String, //L, M, S
});

const InventoryItem = mongoose.model('Inventory', inventoryItemSchema);

module.exports = InventoryItem;
