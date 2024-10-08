import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user?._id, role: user?.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user?._id,
      role: user?.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
