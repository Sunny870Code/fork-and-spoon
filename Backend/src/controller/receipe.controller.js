const Recipe = require('../schema/receipe.schema');

// POST: Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { title, image, youtubeUrl, difficulty, ingredients, instructions } = req.body;

        // Basic validation
        if (!title || !image || !ingredients || !instructions) {
            return res.status(400).json({ error: "Please fill out all required fields." });
        }

        // Create new recipe document linked to the authenticated user
        const newRecipe = new Recipe({
            title,
            image,
            youtubeUrl,
            difficulty: difficulty || "Easy",
            ingredients,
            instructions,
            createdBy: req.user.user
        });

        await newRecipe.save();

        return res.status(201).json({
            message: "Recipe published successfully!",
            recipe: newRecipe
        });

    } catch (err) {
        console.error("Recipe creation error:", err);
        return res.status(500).json({ error: "Server error while creating recipe." });
    }
};

// GET: Fetch all recipes for the recipe list page
const getAllRecipes = async (req, res) => {
    try {
        // Fetch recipes sorted by newest first and optionally populate creator username
        const recipes = await Recipe.find()
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 });

        return res.status(200).json(recipes);
    } catch (err) {
        console.error("Fetch recipes error:", err);
        return res.status(500).json({ error: "Server error while fetching recipes." });
    }
};

module.exports = { createRecipe, getAllRecipes };