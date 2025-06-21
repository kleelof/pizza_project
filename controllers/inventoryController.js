const Inventory = require('../models/inventory');

exports.showAll = async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos

    console.log(`Todos: ${todos}`);
    res.render(res.locals.templatesPath + '/todo/all.ejs', { todos }); // returns teh view

  } catch (err) {
    console.log(err);
    res.redirect('/todos'); // Redirect to the todos list on error
  }
}