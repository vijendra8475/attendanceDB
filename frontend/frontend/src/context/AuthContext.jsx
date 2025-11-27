import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Try to fetch current user on mount (if backend supports)
  useEffect(() => {
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user || res.data);
      return { ok: true, data: res.data };
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      return { ok: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loadingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
