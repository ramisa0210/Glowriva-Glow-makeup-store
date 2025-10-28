
import React from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 to-white text-center p-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with Glowriva 💖. Your order has been received and is being processed.
      </p>
      <Link
        to="/products"
        className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
