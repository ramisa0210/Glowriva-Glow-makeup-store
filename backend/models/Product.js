import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    desc:     { type: String },
    price:    { type: Number, required: true },
    category: { type: String, default: "uncategorized" },
    img:      { type: String },  // stores filename or relative path
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
