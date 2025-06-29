const Inventory = require('../models/inventory');

exports.showAll = async (req, res) => {
  try {
    const inventory = await Inventory.find(); // Fetch all inventory

    console.log(`inventory: ${inventory}`);
    res.render(res.locals.templatesPath + '/inventory/all.ejs', { inventory }); // returns the view

  } catch (err) {
    console.log(err);
    res.redirect('/inventory'); // Redirect to the inventory list on error
  }
}