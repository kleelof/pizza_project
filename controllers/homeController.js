const Home = require('../models/home');
const path = require('path');

exports.getHomePage = async (req, res) => {
  const homeData = {
    featured_pizzas: [
      {
        name: "Pepperoni Pizza",
        description: "Classic pepperoni with cheese",
        price: 12.99,
        image_url: "/images/pepperoni.jpg"
      }
    ],
    promotions: [
      {
        title: "BOGO",
        description: "Buy one get one free on all medium pizzas",
        discount_percentage: 50,
        valid_until: new Date()
      }
    ],
    banners: [
      {
        image_url: "/images/banner.jpg",
        alt_text: "Summer Deal",
        link: "/promotions"
      }
    ]
  };

  res.render('home/home', { homeData });
};