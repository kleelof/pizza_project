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
exports.getUpdateForm = async (req, res) => {
  try {
    const inventoryId = req.params.id; // Extract todo ID from request parameters
    const inventory = await Inventory.findById(inventoryId); // Fetch the todo by ID
    if (!inventory) {
      return res.redirect('/admin/inventory'); // Redirect if todo not found
    }
    res.render(res.locals.templatesPath + '/inventory/update.ejs', { inventory }); // Render update form with todo data
  } catch (err) {
    console.error(err);
    res.redirect('/admin/inventory'); // Redirect to the todos list on error
  }
};
exports.update = async (req, res) => {
  try {
    const updatedData = req.body; // Get updated data from request body
    const updatedInventory = await Inventory.findByIdAndUpdate(updatedData.id, updatedData, { new: true }); // Update the todo
    console.log('Updated /admin/inventory:', updatedInventory);
    res.redirect('/admin'); 
  } catch (err) {
    console.error(err);
    res.redirect('/admin'); 
  }
};

exports.delete = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    await Inventory.findByIdAndDelete(inventoryId); // Delete the todo by ID
    res.redirect('/admin'); // Redirect to the todos list
  }
  catch (err) {
    console.error(err);
    res.redirect('/admin'); // Redirect to the todos list on error
  }
}