import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getCart, addToCart, updateQuantity, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove", protect, removeFromCart);

export default router;
