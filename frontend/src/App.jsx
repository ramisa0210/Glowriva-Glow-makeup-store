import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Notification } from "./components/Notification";

// Lazy-loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Products = React.lazy(() => import("./pages/Products"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Consultation = React.lazy(() => import("./pages/Consultation"));
const CustomerDashboard = React.lazy(() => import("./pages/CustomerDashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const MyOrders = React.lazy(() => import("./pages/Orders"));
const OrderSuccess = React.lazy(() => import("./pages/OrderSuccess"));
const About = React.lazy(() => import("./pages/About")); // ✅ Added About page

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home darkMode={false} showNotification={() => {}} />} />
      <Route path="/login" element={<Login showNotification={() => {}} />} />
      <Route path="/register" element={<Register showNotification={() => {}} />} />
      <Route path="/products" element={<Products showNotification={() => {}} />} />
      <Route path="/cart" element={<Cart showNotification={() => {}} />} />
      <Route path="/consultation" element={<Consultation showNotification={() => {}} />} />
      <Route path="/about" element={<About />} /> {/* ✅ About route added */}
      <Route
        path="/customer-dashboard"
        element={currentUser?.role === "customer" ? <CustomerDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin-dashboard"
        element={currentUser?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/orders"
        element={currentUser ? <MyOrders /> : <Navigate to="/login" replace />}
      />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), duration);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <AuthProvider showNotification={showNotification}>
      <CartProvider>
        <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
          <Header />
          
          <Notification notification={notification} />
          <main className="flex-grow bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-4">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                </div>
              }
            >
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
