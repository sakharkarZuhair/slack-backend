import express from "express";
import { getUsers } from "../controllers/user-controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

// Set up a GET route for users with authentication middleware
router.get("/", authenticateToken, getUsers);

export default router;
