import app from "./app";
import dotenv from "dotenv";
import db from "./database/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Test DB connection on start
db.raw("SELECT 1")
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        console.log("Starting server without DB connection for debugging...");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} (DB Disconnected)`);
        });
    });
