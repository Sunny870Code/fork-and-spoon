require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/repositry/database.js");
const seedRoles = require("./src/seeder/role.seeder.js")


async function startServer() {
    try {

        await connectDB();
        await seedRoles();  //seed default roles immediatel after connection
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1);
    }
}

startServer() 