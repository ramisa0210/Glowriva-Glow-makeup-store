// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// ✅ Import routes
import contactRoutes from "./routes/contactRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// ✅ Middleware
//app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);
app.use(express.json()); // Important to parse JSON body
app.use(express.static("public"));

// ✅ Routes
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

//npm install -g @google/gemini-cli
//gemini