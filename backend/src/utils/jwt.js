import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const EXPIRES_IN = "30d";

export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: EXPIRES_IN,
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}