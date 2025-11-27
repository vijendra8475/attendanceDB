import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">AttendanceSys</Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link className={`px-3 py-1 rounded ${loc.pathname === "/dashboard" ? "bg-blue-600 text-white" : "text-gray-700"}`} to="/dashboard">Dashboard</Link>
              <Link className={`px-3 py-1 rounded ${loc.pathname === "/mark" ? "bg-blue-600 text-white" : "text-gray-700"}`} to="/mark">Mark</Link>

              <div className="flex items-center gap-2 border p-1 rounded">
                <span className="text-sm">{user.name || user.email}</span>
                <button onClick={logout} className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Logout</button>
              </div>
            </>
          ) : (
            <Link to="/" className="px-3 py-1 rounded text-gray-700">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
