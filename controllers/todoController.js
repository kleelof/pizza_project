const Todo = require('../models/todo');

// Create a new todo
exports.getCreateForm = async(req, res) => {
  res.render(res.locals.templatesPath + '/addTodo.html');
}

exports.create = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.redirect("/todos");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// List all todos
exports.showAll = async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos
    res.render(res.locals.templatesPath + '/todos.ejs', { todos });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todos');
  }
}