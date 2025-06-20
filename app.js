const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const todoController = require('./controllers/todoController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve templates
app.use((req, res, next) => {
  res.locals.templatesPath = path.join(process.cwd(), 'views');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// template engine setup
app.set('view engine', 'ejs');


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// Todo Routes
app.get('/todo/create', todoController.getCreateForm);
app.post('/todo/create', todoController.create);
app.get('/todos', todoController.showAll);
app.get('/todo/delete/:id', todoController.delete);
app.get('/todo/:id', todoController.view);
app.get('/todo/update/:id', todoController.getUpdateForm);
app.post('/todo/update/', todoController.update);

// Inventory routes


// Ordering routes


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});