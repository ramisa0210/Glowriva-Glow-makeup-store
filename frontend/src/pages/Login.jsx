import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const success = await login(email, password);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else {
      setErrorMsg("Invalid email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 to-rose-100 overflow-hidden px-4">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-rose-300 rounded-full top-[-200px] left-[-200px] blur-[180px] opacity-30 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-pink-400 rounded-full bottom-[-150px] right-[-150px] blur-[160px] opacity-25 animate-pulse" />

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="bg-white/90 backdrop-blur-md border border-rose-200 p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Login to continue</p>

        {errorMsg && (
          <div className="text-center px-4 py-2 rounded bg-red-100 text-red-700 font-medium border border-red-300">
            {errorMsg}
          </div>
        )}

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-600 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.form>
    </main>
  );
};

export default Login;
