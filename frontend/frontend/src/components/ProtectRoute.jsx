// optional - if you prefer separate file
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();
  if (loadingAuth) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/" replace />;
}
