import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  placeOrder,
  getCustomerOrders,
  getAllOrders,
  getOrderStats,
  updateOrderStatus,
    deleteOrder,            // NEW

} from "../controllers/orderController.js";

const router = express.Router();

/* Customer */
router.post("/", protect, placeOrder);
router.get("/my", protect, getCustomerOrders);

/* Admin */
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);
export default router;
