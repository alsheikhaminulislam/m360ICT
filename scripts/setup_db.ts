import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database ${process.env.DB_NAME} created or already exists.`);
    } catch (error) {
        console.error("Error creating database:", error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

setup();
