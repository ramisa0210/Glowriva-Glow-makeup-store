import jwt    from "jsonwebtoken";
import dotenv  from "dotenv";
import User   from "../models/User.js";

dotenv.config();
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing in .env");

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(401).json({ error: "Token invalid or expired" });
  }
};

export const admin = (req, _res, next) =>
  req.user?.role === "admin"
    ? next()
    : _res.status(403).json({ error: "Admin only" });
