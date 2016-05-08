// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/userController.js');
var recipeController = require('./controllers/recipeController.js');
var authController = require('./controllers/authenticationController.js');


// Connect to the recipelocker MongoDB
mongoose.connect('mongodb://localhost:27017/recipes');


// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));


// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();


// Create endpoint handlers for /recipes
router.route('/recipes')
  .post(authController.isAuthenticated, recipeController.postRecipes)
  .get(authController.isAuthenticated, recipeController.getRecipes);

// Create endpoint handlers for /recipes/:recipe_id
router.route('/recipes/:recipe_id')
  .get(authController.isAuthenticated, recipeController.getRecipe)
  .put(authController.isAuthenticated, recipeController.putRecipe)
  .delete(authController.isAuthenticated, recipeController.deleteRecipe);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);



// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Demoe port ' + port);
