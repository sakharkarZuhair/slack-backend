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
    return res.json({
      message: "Login Successful",
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      },
      accessToken,
      refreshToken,
    });
  }
);

export default router;
