import express from 'express';
import indexRoutes from '../routes/index.js';

const app = express();

// Middleware setup
app.use(express.json());

app.use('/', indexRoutes);

export default app;