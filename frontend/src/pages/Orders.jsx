import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaShoppingCart,
  FaListAlt,
} from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 to-white relative">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 shadow-lg fixed md:relative z-20 top-0 left-0 h-full p-6 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col items-center mb-10">
          <img
            src="/images/logo.png"
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 mb-3 shadow"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=Glowriva&background=pink&color=fff";
            }}
          />
          <h2 className="text-xl font-semibold text-gray-800">Hello, Beauty!</h2>
          <p className="text-sm text-gray-500">Welcome to Glowriva 💖</p>
        </div>

        <nav className="space-y-4">
          <Link
            to="/products"
            className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition"
          >
            <FaBoxOpen />
            View Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition"
          >
            <FaShoppingCart />
            View Cart
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            <FaListAlt />
            My Orders
          </Link>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 text-pink-600 text-3xl focus:outline-none"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-4 shadow rounded mb-4">
              <p className="font-semibold text-gray-700">Order ID: {order._id}</p>
              <p className="text-gray-600">Total: ৳{order.totalAmount}</p>
              <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.product.name} — Qty: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
