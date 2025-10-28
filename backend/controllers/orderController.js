import Order from "../models/Order.js";

/* -------------------- place order  ------------------- */
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingDetails, paymentMethod } = req.body;
    if (!items?.length) return res.status(400).json({ error: "Order items required" });

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount,
      shippingDetails,
      paymentMethod,
      status: "pending",
    });

    res.status(201).json({ success: true, message: "Order placed", order });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

/* -------------------- customer orders (unchanged) --------------- */
export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Get customer orders error:", err);
    res.status(500).json({ error: "Failed to get orders" });
  }
};

/* -------------------- admin: all orders ------------------------- */
export const getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/* -------------------- admin: dashboard stats -------------------- */
export const getOrderStats = async (_req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders   = orders.length;
    const totalRevenue  = orders.reduce((acc, o) => acc + o.totalAmount, 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    res.json({ totalOrders, totalRevenue, pendingOrders });
  } catch (err) {
    console.error("Order stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

/* -------------------- admin: update status ---------------------- */
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const valid = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  if (!valid.includes(status?.toLowerCase()))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status.toLowerCase();
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.deleteOne();
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
};