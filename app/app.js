import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config(); // Load .env variables first

import express from "express";
import cors from "cors";
import ConnectDB from "../config/db.js";
import passport from "passport";
import "../config/passport-config.js"; // Import passport configuration
import indexRoutes from "../routes/index.js"; // Import routes

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

ConnectDB(); // Connect to the database

app.use("/api/v1", indexRoutes);

export default app;
