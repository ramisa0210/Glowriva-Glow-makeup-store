import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register Controller
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // ❌ DO NOT hash password here — mongoose pre-save hook will do it

    // ✅ Create new user with plain password; pre-save hook will hash it
    const user = await User.create({
      name,
      email: email.trim(),
      password,            // pass plain password here
      role: role || "customer",  // fixed default role to "customer"
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({
      error: "Registration failed",
      details: err.message,
    });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📥 Login email:", email);
    console.log("📥 Login password:", password);

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("🔐 Stored hash:", user.password);

    const match = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", match);

    if (!match) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Read JWT_SECRET here to ensure it's loaded
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.log("❌ JWT_SECRET missing");
      throw new Error("JWT_SECRET is missing. Check your .env file.");
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "600d" }
    );

    console.log("✅ JWT generated:", token);

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// ✅ Logout Controller (optional)
export const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
