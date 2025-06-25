const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  featured_pizzas: [
    {
      name: String,
      description: String,
      price: Number,
      image_url: String
    }
  ],
  promotions: [
    {
      title: String,
      description: String,
      discount_percentage: Number,
      valid_until: Date
    }
  ],
  banners: [
    {
      image_url: String,
      alt_text: String,
      link: String
    }
  ],
  last_updated: {
    type: Date,
    default: Date.now
  }
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
