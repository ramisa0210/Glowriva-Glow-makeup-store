import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 },
});

const shippingDetailsSchema = new mongoose.Schema(
  {
    name:    String,
    phone:   String,
    city:    String,
    area:    String,
    address: String,
    email:   String,
    note:    String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items:          { type: [itemSchema], required: true },
    totalAmount:    { type: Number, required: true },
    shippingDetails: shippingDetailsSchema,
    paymentMethod:  { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
