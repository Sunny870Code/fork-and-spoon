const mongoose = require("mongoose");

//creating schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password:{
        type: String,
        required: function(){
            return !this.googleId;
        },
        trim: true
    },
    googleId: {
      type: String, // <-- Crucial: Must be declared here so Mongoose doesn't strip it
      default: null,
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required: true
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    otp:{ 
        type: String
    },
    otpExpires:{
        type: Date
    }
},{timestamps: true});

//creating model

const userModel = mongoose.model("User",userSchema);


module.exports = userModel;