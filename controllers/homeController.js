const Home = require('../models/home');
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

// Show Admin Form to Edit Home Page Content
exports.getEditForm = async (req, res) => {
  try {
    const homeData = await Home.findOne().sort({ last_updated: -1 });
    res.render(path.join(res.locals.templatesPath, 'home', 'edit.ejs'), { homeData });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

// Update Home Page Content
exports.update = async (req, res) => {
  try {
    const data = req.body;
    const homeData = await Home.findOneAndUpdate({}, data, { upsert: true, new: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};