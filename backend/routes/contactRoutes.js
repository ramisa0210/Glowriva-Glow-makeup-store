import express from "express";
const router = express.Router();

// Example route
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  res.status(200).json({ success: true, message: "Message received!" });
});

export default router;
