const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

//cors
const allowedOrigins = [
  "http://localhost:5173",          // For local development
  "https://fork-and-spoon-frontend.vercel.app" // Your live Vercel frontend URL
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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

