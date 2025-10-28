import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaShoppingCart,
  FaListAlt,
} from "react-icons/fa";

const CustomerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
            className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition"
          >
            <FaListAlt />
            My Orders
          </Link>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 text-pink-600 text-3xl focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            🌸 Glowriva Customer Dashboard
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Manage your beauty essentials, track orders, and enjoy your journey to glow!
          </p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/products"
              className="bg-gradient-to-tr from-pink-100 to-pink-200 hover:scale-105 hover:shadow-xl transition-all p-6 rounded-xl text-center"
            >
              <FaBoxOpen className="text-4xl mx-auto text-pink-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">View Products</h3>
            </Link>

            <Link
              to="/cart"
              className="bg-gradient-to-tr from-pink-100 to-pink-200 hover:scale-105 hover:shadow-xl transition-all p-6 rounded-xl text-center"
            >
              <FaShoppingCart className="text-4xl mx-auto text-pink-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">View Cart</h3>
            </Link>

            <Link
              to="/orders"
              className="bg-gradient-to-tr from-pink-100 to-pink-200 hover:scale-105 hover:shadow-xl transition-all p-6 rounded-xl text-center"
            >
              <FaListAlt className="text-4xl mx-auto text-pink-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">My Orders</h3>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
