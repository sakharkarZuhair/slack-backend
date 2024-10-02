import express from "express";
import GoogleAuthRoutes from "./auth-routes.js";
import userRoutes from "./user-routes.js";
import {
  loginUser,
  registerUser,
  tokenIsRequired,
  generateNewTokenUsingRefreshToken,
} from "../controllers/user-controller.js";
import passport from "passport";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

router.use(GoogleAuthRoutes);
router.route("/register").post(registerUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);

router.use("/user", userRoutes);

router.post("/generate-new-access-token", generateNewTokenUsingRefreshToken);

router.get("/check-token", authenticateToken, tokenIsRequired);

export default router;
