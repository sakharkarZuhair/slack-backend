import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import express from "express";
import cors from "cors";
import ConnectDB from "../config/db.js";
import passport from "passport";
import "../config/passport-config.js";
import indexRoutes from "../routes/index.js";

const app = express();

// Middleware setup
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // React frontend URL
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(passport.initialize());

ConnectDB(); // Connect to the database

app.use("/api/v1", indexRoutes);

export default app;
