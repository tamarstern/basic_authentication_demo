// Load required packages
var Recipe = require('../models/recipe');

// Create endpoint /api/recipes for POSTS
exports.postRecipes = function (req, res) {
    // Create a new instance of the recipe model
    var recipe = new Recipe();
    
    // Set the recipe properties that came from the POST data
    recipe.title = req.body.title;
    recipe.ingredients = req.body.ingredients;
    recipe.preparation = req.body.preparation;
    recipe.comments = req.body.comments;
    
    // Save the recipe and check for errors
    recipe.save(function (err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Recipe added', data: recipe });
    });
};

// Create endpoint /api/recipes for GET
exports.getRecipes = function (req, res) {
    // Use the recipe model to find all recipe
    Recipe.find(function (err, recipes) {
        if (err)
            res.send(err);
        
        res.json(recipes);
    });
};

// Create endpoint /api/recipes/:recipe_id for GET
exports.getRecipe = function (req, res) {
    // Use the recipe model to find a specific recipe
    Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
        
        res.json(recipe);
    });
};

// Create endpoint /api/recipes/:recipe_id for PUT
exports.putRecipe = function (req, res) {
    // Use the recipe model to find a specific recipe
    Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
        
        // Update the existing recipe 
        recipe.title = req.body.title;
        recipe.ingredients = req.body.ingredients;
        recipe.preparation = req.body.preparation;
        recipe.comments = req.body.comments;
        
        // Save the recipe and check for errors
        recipe.save(function (err) {
            if (err)
                res.send(err);
            
            res.json(recipe);
        });
    });
};

// Create endpoint /api/recipes/:recipe_id for DELETE
exports.deleteRecipe = function (req, res) {
    // Use the recipe model to find a specific recipe and remove it
    Recipe.findByIdAndRemove(req.params.recipe_id, function (err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'recipe removed' });
    });
};
