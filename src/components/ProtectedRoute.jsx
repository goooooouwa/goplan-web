import { useAuth } from "hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { getAccessToken } = useAuth();

  if (getAccessToken() === null) {
    return <Navigate to="/welcome" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;