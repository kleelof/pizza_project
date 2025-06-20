
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: String,
  notes: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
