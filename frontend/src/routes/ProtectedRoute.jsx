// src/routes/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/login" }) => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role check if specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Support both component wrapping and Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;