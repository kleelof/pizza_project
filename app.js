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
app.use(express.static(path.join(__dirname, 'static')));

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
app.get('/admin/todos', todoController.showAll);
app.get('/admin/todo/delete/:id', todoController.delete);
app.get('/todo/:id', todoController.view);
app.get('/admin/todo/update/:id', todoController.getUpdateForm);
app.post('/admin/todo/update/', todoController.update);

// Inventory Routes
app.get('/admin/inventory', inventoryController.showAll);

// Ordering routes
app.get('/order/create', orderController.getCreateForm);
app.post('/order/create', orderController.create);
app.get('/admin/order', orderController.showAll);
app.get('/admin/order/delete/:id', orderController.delete);
app.get('/admin/order/:id', orderController.view);
app.get('/admin/order/update/:id', orderController.getUpdateForm);
app.post('/admin/order/update/:id', orderController.update);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});