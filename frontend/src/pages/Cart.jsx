import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import getImageUrl from "../utils/imageUtils";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaShoppingCart,
  FaListAlt,
} from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    address: "",
    email: "",
    orderNote: "",
    shippingMethod: "outside",
    paymentMethod: "cod",
  });
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 99;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.city ||
      !formData.area ||
      !formData.address.trim()
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      console.log("Form Data:", formData);
      console.log("Cart Items:", cartItems);
      console.log("Token:", token);
      await axios.post(
        "/orders",
        {
          items: cartItems.map((item) => ({
            product: item._id || item.id,
            quantity: item.quantity,
          })),
          totalAmount: total,
          shippingMethod:
            formData.shippingMethod === "outside"
              ? "Delivery Outside Dhaka"
              : "Delivery Inside Dhaka",
          paymentMethod:
            formData.paymentMethod === "cod" ? "Cash on Delivery" : "Bkash",
          billingInfo: {
            name: formData.name,
            phone: formData.phone,
            city: formData.city,
            area: formData.area,
            address: formData.address,
            email: formData.email,
            orderNote: formData.orderNote,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully!");
      clearCart();
      setShowCheckout(false);
      navigate("/order-success");
    } catch (err) {
      console.error("Order error:", err.response ? err.response.data : err.message);
      alert("Failed to place order. Please try again.");
    }
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
            alt="User"
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
          <Link to="/products" className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition">
            <FaBoxOpen /> View Products
          </Link>
          <Link to="/cart" className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition">
            <FaShoppingCart /> View Cart
          </Link>
          <Link to="/orders" className="flex items-center gap-3 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition">
            <FaListAlt /> My Orders
          </Link>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 text-pink-600 text-3xl focus:outline-none"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-bold mb-4">My Cart</h1>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <div className="grid gap-4 mb-8">
              {cartItems.map((item) => (
                <div key={item._id || item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                  <div className="flex items-center gap-4">
                    <img
                      src={getImageUrl(item.img || item.image)}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">৳{item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Subtotal: ৳{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id || item.id, parseInt(e.target.value))
                      }
                      className="w-16 text-center border rounded"
                    />
                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right">
              <h2 className="text-2xl font-bold mb-4">Total: ৳{total.toFixed(2)}</h2>
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        {/* Updated Checkout Modal Design */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-pink-600">Checkout</h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✖
                  </button>
                </div>

                {/* Cart Items Preview */}
                <div className="mb-6 border-b pb-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="flex items-center">
                      <img
                        src={getImageUrl(item.img || item.image)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-pink-600 font-bold">
                          ৳{item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Form */}
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <h3 className="font-bold border-b pb-2">Billing & Shipping</h3>

                  {error && <p className="text-red-600 font-semibold">{error}</p>}

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Name" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Phone" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
                      <option value="">Select City</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                    </select>
                    <select name="area" value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
                      <option value="">Select Area</option>
                      <option>Gulshan</option>
                      <option>Banani</option>
                      <option>Oxygen</option>
                      <option>GEC</option>
                    </select>
                  </div>

                  <textarea name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Address" required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Email (optional)" />
                  <textarea name="orderNote" value={formData.orderNote} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Order Note (optional)" />

                  <div className="pt-4 border-t">
                    <h3 className="font-bold mb-2">Shipping Method</h3>
                    <label className="flex items-center">
                      <input type="radio" name="shippingMethod" value="outside" checked={formData.shippingMethod === "outside"} onChange={handleChange} className="mr-2" />
                      Delivery Outside Dhaka
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="shippingMethod" value="inside" checked={formData.shippingMethod === "inside"} onChange={handleChange} className="mr-2" />
                      Delivery Inside Dhaka
                    </label>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between"><span>Subtotal</span><span>৳{subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>৳{shippingCost}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Total</span><span>৳{total.toFixed(2)}</span></div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-bold mb-2">Payment Method</h3>
                    <label className="flex items-center">
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} className="mr-2" />
                      Cash on Delivery
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="paymentMethod" value="bkash" checked={formData.paymentMethod === "bkash"} onChange={handleChange} className="mr-2" />
                      Bkash
                    </label>
                  </div>

                  <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition mt-4">
                    Place Order
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
