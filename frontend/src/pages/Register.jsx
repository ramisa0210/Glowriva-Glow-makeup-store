import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { name, email, password, role } = formData;
      const res = await axios.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      // Registration successful
      setErrorMsg("✅ Registration successful! Redirecting to login...");
      setFormData({ name: "", email: "", password: "", role: "customer" });
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errMsg =
        error?.response?.data?.error ||
        "❌ Registration failed. Please try again.";
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 to-rose-100 overflow-hidden px-4">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-rose-300 rounded-full top-[-200px] left-[-200px] blur-[180px] opacity-30 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-pink-400 rounded-full bottom-[-150px] right-[-150px] blur-[160px] opacity-25 animate-pulse" />

      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="bg-white/90 backdrop-blur-md border border-rose-200 p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">Create Account</h2>
        <p className="text-sm text-center text-gray-500">Join us today</p>

        {errorMsg && (
          <div className={`text-center px-4 py-2 rounded font-medium border ${
            errorMsg.includes("✅") 
              ? "bg-green-100 text-green-700 border-green-300" 
              : "bg-red-100 text-red-700 border-red-300"
          }`}>
            {errorMsg}
          </div>
        )}

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <motion.div 
          whileFocus={{ scale: 1.02 }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition bg-white"
        >
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            disabled={loading}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </div>
          ) : "Create Account"}
        </motion.button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </motion.form>
    </main>
  );
};

export default Register;