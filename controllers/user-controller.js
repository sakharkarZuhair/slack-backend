import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { request, response } from "express";

import Users from "../models/user-model.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/send-status-.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token-utils.js";

export const registerUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, "User Already Exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split("@")[0];

    const newUser = new Users({
      name,
      email,
      username,
      password: hashedPassword,
      auth_provider: "custom",
      role: [{ role: "User" }],
    });

    await newUser.save();
    return sendSuccessResponse(
      res,
      newUser,
      "User registered successfully",
      201
    );
  } catch (err) {
    return sendErrorResponse(res, "Internal Server Error", 500);
  }
};

export const loginUser = (req, res) => {
  const user = req.user;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  try {
    return sendSuccessResponse(
      res,
      {
        user: {
          name: user?.name,
          email: user?.email,
          username: user?.username,
        },
        accessToken,
        refreshToken,
      },
      "Login successful",
      200
    );
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const tokenIsRequired = (req, res) => {
  return res.json({
    message: "Token Is Valid",
  });
};

export const generateNewTokenUsingRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await Users.findById(decoded.id);
    if (!user) {
      return res.sendStatus(403);
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.sendStatus(403);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    return sendSuccessResponse(
      res,
      { users: users },
      "Users Fetched successfully",
      200
    );
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error", 500);
  }
};

// import axios from "axios";

// // Example function to make an authenticated request and handle token expiration
// async function makeAuthenticatedRequest() {
//   try {
//     // Send a request using your access token
//     const response = await axios.get("/protected-route", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response.status === 403) {
//       // If access token has expired, use refresh token to get a new one
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         try {
//           const tokenResponse = await axios.post("/refresh-token", {
//             refreshToken
//           });

//           const { accessToken, refreshToken: newRefreshToken } = tokenResponse.data;

//           // Save the new tokens
//           localStorage.setItem("accessToken", accessToken);
//           localStorage.setItem("refreshToken", newRefreshToken);

//           // Retry the original request with the new access token
//           const retryResponse = await axios.get("/protected-route", {
//             headers: {
//               Authorization: `Bearer ${accessToken}`
//             }
//           });

//           return retryResponse.data;
//         } catch (refreshError) {
//           // If refreshing token fails, redirect to login or handle error
//           console.error("Refresh token failed", refreshError);
//           window.location.href = "/login"; // Example action
//         }
//       } else {
//         // No refresh token, redirect to login
//         window.location.href = "/login";
//       }
//     } else {
//       // Handle other types of errors
//       console.error("Request failed", error);
//     }
//   }
// }
