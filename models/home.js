const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  featuredItems: [String], // Optional array of items to highlight
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Home', homeSchema);