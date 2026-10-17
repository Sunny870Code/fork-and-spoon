const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard'], 
        default: 'Easy' 
    },
    ingredients: [{ 
        type: String, 
        required: true 
    }],
    instructions: [{ 
        type: String, 
        required: true 
    }],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },youtubeUrl:{
        type:String,
        trim:true,
        default:""
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);