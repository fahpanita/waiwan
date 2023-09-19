import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import liff from "@line/liff";
import { setInterceptorRequestToken } from "../../constands/api";

export const ProtectedRoute = ({ children }) => {
  const { token, idToken } = useAuth();

  useEffect(() => {
    if (token && idToken) {
      setInterceptorRequestToken(token, idToken);
    }
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
