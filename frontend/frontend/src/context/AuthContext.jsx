import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const login = async ({ role = 'user', email, password }) => {
    setLoadingAuth(true);
    try {
      if (role === 'admin') {
        const res = await api.post("/admin/login", { email, password });
        if (res.status === 200 && res.data.admin) {
          setUser({ admin: true, email });
          return { ok: true, data: res.data };
        }
        return { ok: false, message: res.data?.message || 'Admin login failed' };
      } else {
        const res = await api.post("/user/login", { email });
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
          return { ok: true, data: res.data };
        }
        return { ok: false, message: res.data?.message || 'User login failed' };
      }
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || err.message };
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>{children}</AuthContext.Provider>;
}
