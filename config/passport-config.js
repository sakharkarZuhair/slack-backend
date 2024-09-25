import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import GitHubStrategy from "passport-github2";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

import Users from "../models/user-model.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token-utils.js";

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "7444739130-0qtkbmpfaov9c12bf8t907cig0idsjin.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (profile, done) => {
      try {
        const email = profile.emails[0]?.value;
        console.log("Google Auth User", profile);

        const existingUser = await Users.findByEmail(email);

        if (existingUser) {
          const accessToken = generateAccessToken(existingUser);
          const refreshToken = generateRefreshToken(existingUser);
          return done(null, { user: existingUser, accessToken, refreshToken });
        }

        const newUser = new Users({
          name: profile.displayName,
          email: email,
          username: email.split("@")[0],
          auth_provider: "google",
          role: [{ role: "User", workspace: null }],
        });

        await newUser.save();

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        return done(null, { user: newUser, accessToken, refreshToken });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Local Strategy for Login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // You can use a generic name for the input field
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        let user = await Users.findByEmail(email);

        if (!user) {
          user = await Users.findOne({ username: email });
        }

        if (!user) {
          return done(null, false, { message: "Invalid email or username" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
