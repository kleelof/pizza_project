const Todo = require('../models/todo');

// Create a new todo
exports.getCreateForm = async(req, res) => {
  res.render(res.locals.templatesPath + '/todo/add.ejs');
}

exports.create = async (req, res) => {
  try {
    const { name, notes } = req.body;
    const todo = new Todo({
      name,
      notes,
      completed: false
    });
    await todo.save();
    res.redirect('/todos');
  } catch (err) {
    console.error('Error creating todo:', err);
    res.redirect('/todos');
  }
};

// List all todos
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

// Delete a todo
exports.delete = async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findByIdAndDelete(todoId); // Delete the todo by ID
    res.redirect('/todos'); // Redirect to the todos list
  }
  catch (err) {
    console.error(err);
    res.redirect('/todos'); // Redirect to the todos list on error
  }
}

// view a todo
exports.view = async (req, res) => {
  try {
    const todoId = req.params.id; // extract todo ID from request parameters - /todo/:id
    const todo = await Todo.findById(todoId); // Fetch the todo by ID

    if (!todo) {
      return res.redirect('/todos'); // Use return here
    }

    res.render(res.locals.templatesPath + '/todo/view.ejs', { todo });
  } catch (err) {
    console.error(err);
    res.redirect('/todos'); // Redirect to the todos list on error
  }
};

// Update a todo
exports.getUpdateForm = async (req, res) => {
  try {
    const todoId = req.params.id; // Extract todo ID from request parameters
    const todo = await Todo.findById(todoId); // Fetch the todo by ID
    if (!todo) {
      return res.redirect('/todos'); // Redirect if todo not found
    }
    res.render(res.locals.templatesPath + '/todo/update.ejs', { todo }); // Render update form with todo data
  } catch (err) {
    console.error(err);
    res.redirect('/todos'); // Redirect to the todos list on error
  }
};

exports.update = async (req, res) => {
  try {
    const updatedData = req.body; // Get updated data from request body
    const updatedTodo = await Todo.findByIdAndUpdate(updatedData.id, updatedData, { new: true }); // Update the todo
    console.log('Updated Todo:', updatedTodo);
    res.redirect('/todo'); 
  } catch (err) {
    console.error(err);
    res.redirect('/todos'); 
  }
};
