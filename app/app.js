import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import ConnectDB from '../config/db.js'

import indexRoutes from '../routes/index.js';

dotenv.config();

const app = express();

ConnectDB()

// Middleware setup
app.use(express.json());
app.use(cors());

app.use('/api/v1', indexRoutes);

export default app;