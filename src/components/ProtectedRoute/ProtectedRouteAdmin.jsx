import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

export const ProtectedRouteAdmin = ({ children }) => {
  const { token, profile } = useAuth();

  if (!token || profile?.role != 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
