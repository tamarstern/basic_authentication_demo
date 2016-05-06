// Load required packages
var mongoose = require('mongoose');


// Define our recipe schema
var RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    preparation: String,
    comments: String
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', RecipeSchema);
