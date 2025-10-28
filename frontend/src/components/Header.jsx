import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
// Importing a filled cart icon for a more modern look
import { IoCartSharp } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems = [] } = useCart();

  // State to track dark mode, can be controlled by a global state or a button
  const [isDarkMode, setIsDarkMode] = useState(false);

  // You can link this to a global context or a system preference check
  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Links for the main navigation menu
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "Offers" },
    { to: "/consultation", label: "Consultation" },
  ];

  // Helper function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <header className="bg-white text-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-500 dark:bg-gray-900 dark:text-gray-100 dark:shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo and title on the left */}
        <div className="flex items-center cursor-pointer space-x-2">
          <img
            src="/images/lad.png"
            alt="GlowrivaGlow Logo"
            className="w-10 h-10 sm:w-20 sm:h-20 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40";
            }}
          />
          <span className="text-xl font-bold tracking-wide select-none hidden sm:block">
            GlowrivaGlow
          </span>
        </div>

        {/* Desktop Navigation in the middle */}
        <nav className="hidden md:flex flex-grow justify-center space-x-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-600 hover:text-pink-600 transition-colors duration-300 font-medium 
                dark:text-gray-300 dark:hover:text-pink-400 ${
                  isActive ? "text-pink-600 border-b-2 border-pink-600 pb-1 dark:text-pink-400 dark:border-pink-400" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right-aligned icons for desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-lg text-pink-600 font-semibold border border-pink-600 
            hover:bg-pink-600 hover:text-white transition-all duration-300
            dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold 
            hover:bg-pink-700 transition-colors duration-300 dark:bg-pink-400 dark:hover:bg-pink-500"
          >
            Sign Up
          </NavLink>
          
          {/* Dark Mode Toggle Button */}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          
          <NavLink to="/cart" className="relative text-gray-600 hover:text-pink-600 transition-colors dark:text-gray-300 dark:hover:text-pink-400">
            <IoCartSharp className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Button on the right */}
        <div className="flex items-center md:hidden">
          <NavLink to="/cart" className="relative mr-4 text-gray-600 hover:text-pink-600 transition-colors dark:text-gray-300 dark:hover:text-pink-400">
            <IoCartSharp className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>
          <button
            className="focus:outline-none text-gray-600 hover:text-pink-600 transition-colors dark:text-gray-300 dark:hover:text-pink-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white px-4 py-2 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            {[...navLinks, { to: "/login", label: "Login" }, { to: "/register", label: "Sign Up" }].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400" : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;