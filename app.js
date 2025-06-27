const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Controllers
const homeController = require('./controllers/homeController'); // NEW
const todoController = require('./controllers/todoController');
const inventoryController = require('./controllers/inventoryController');
const orderController = require('./controllers/orderController');


const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve templates
app.use((req, res, next) => {
  res.locals.templatesPath = path.join(process.cwd(), 'views');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Template engine setup
app.set('view engine', 'ejs');

// Static files
app.use(express.static('static'));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// Home Page Route (NEW)
app.get('/', homeController.getHomePage);


// Todo Routes
app.get('/todo/create', todoController.getCreateForm);
app.post('/todo/create', todoController.create);
app.get('/todos', todoController.showAll);
app.get('/todo/delete/:id', todoController.delete);
app.get('/todo/:id', todoController.view);
app.get('/todo/update/:id', todoController.getUpdateForm);
app.post('/todo/update/', todoController.update);

// Inventory Routes
app.get('/inventory', inventoryController.showAll);

// Order Routes
app.get('/order', orderController.showAll);
app.get('/order/create', orderController.getCreateForm);


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});