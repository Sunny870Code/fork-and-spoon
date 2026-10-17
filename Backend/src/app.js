const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

//cors

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());
const authRoutes = require("./routes/authRoutes")
const recipeRoutes = require('./routes/recipeRoutes');

app.use('/api/recipes', recipeRoutes);

app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from the basic server setup!" });

});

module.exports = app;

