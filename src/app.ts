import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error";
import authRoutes from "./routes/auth";
import employeeRoutes from "./routes/employees";
import attendanceRoutes from "./routes/attendance";
import reportRoutes from "./routes/reports";

dotenv.config();

const app = express();

// CORS Configuration
// Get allowed origins from environment variable or allow all in development
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '*';
const allowAllOrigins = allowedOriginsEnv.trim() === '*';

const corsOptions: cors.CorsOptions = {
    origin: allowAllOrigins
        ? true // Allow all origins when '*' is specified
        : (origin, callback) => {
            // Allow requests with no origin (like mobile apps, Postman, or same-origin)
            if (!origin) return callback(null, true);

            const allowedOrigins = allowedOriginsEnv.split(',').map(o => o.trim());

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    credentials: true, // Allow cookies and authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // Cache preflight requests for 10 minutes
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));

// Static files for uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/reports", reportRoutes);

app.get("/", (req, res) => {
    res.json({ message: "HR Management API is running" });
});

app.use(errorHandler);

export default app;
