import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const { accessToken, refreshToken, user } = req.user;
    return res.redirect(
      `http://localhost:3000/authentication?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }
);

export default router;
