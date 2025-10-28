import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children, showNotification }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          setCurrentUser(parsedUser);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log("AuthContext: User logged in", user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      if (showNotification)
        showNotification("Login Failed. Check your credentials.", "error");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await axios.post("/auth/register", userData);
      // Auto-login after registration
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error("Registration failed:", error);
      if (showNotification)
        showNotification("Registration Failed. Try again.", "error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
