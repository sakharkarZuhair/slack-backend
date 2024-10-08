import Users from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/token-utils.js";

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  // If no access token is provided, return unauthorized status
  if (!accessToken) {
    console.log("No access token provided");
    return res.sendStatus(401);
  }

  try {
    // Verify the access token
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Access token is valid. User:", user);

    req.user = user; // Attach user info to request
    return next(); // Proceed to the next middleware or route
  } catch (error) {
    // console.log("Access token expired or invalid", error);
    // If the access token has expired, try to refresh it using the refresh token
    if (error.name === "TokenExpiredError" && refreshToken) {
      // console.log("ERRRR")
      try {
        // Verify the refresh token
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        // console.log("Refresh token decoded:", decoded);

        const existingUser = await Users.findById(decoded.id);
        if (!existingUser) {
          // console.log("No user found for refresh token");
          return res.sendStatus(403); // Forbidden
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(existingUser);
        // console.log("Generated new access token:", newAccessToken);

        // Send new tokens back to the client
        // console.log("TOken Expired")
        return res.json({
          accessToken: newAccessToken,
          refreshToken: refreshToken, // Optionally send the refresh token
          message: 'access-token-expired'
        });
      } catch (refreshError) {
        console.log("Error verifying refresh token", refreshError);
        return res.sendStatus(403); // Forbidden
      }
    } else {
      // If the error is not due to an expired token, respond with forbidden
      console.log("Token is invalid", error);
      return res.sendStatus(403); // Forbidden
    }
  }
};
