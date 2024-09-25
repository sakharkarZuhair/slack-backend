import Users from "../models/user-model.js";
import jwt from "jsonwebtoken";

import { generateAccessToken } from "../utils/token-utils.js";

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" && refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        const existingUser = await Users.findById(decoded.id);
        if (!existingUser) {
          return res.sendStatus(403);
        }

        const newAccessToken = generateAccessToken(existingUser);
        res.set("Authorization", `Bearer ${newAccessToken}`);
        req.user = existingUser;
        return next();
      } catch (refreshError) {
        return res.sendStatus(403);
      }
    } else {
      return res.sendStatus(403);
    }
  }
};
