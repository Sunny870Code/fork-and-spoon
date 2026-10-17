const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS : 10000
        });
        console.log("connected to Database");
    } catch (err){
        console.error("MongoDB connection error:",err);
        throw err;
    }
}

module.exports = connectDB;