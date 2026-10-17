const express = require("express");
const router = express.Router();
const { authUser, requireRole } = require("../middleware/auth.middleware");
const recipeController = require("../controller/receipe.controller");


router.post("/recipes", authUser, requireRole(['creator', 'admin']), recipeController.createRecipe);
router.get("/getRecipe",recipeController.getAllRecipes);

module.exports = router;