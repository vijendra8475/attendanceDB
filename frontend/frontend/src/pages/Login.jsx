import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  React.useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setErr("");
    if (!email || !password) return setErr("Please enter email & password");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setErr(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[380px] bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {err && <div className="mb-3 text-red-600">{err}</div>}

        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full border p-2 rounded mb-3" placeholder="you@example.com" />

        <label className="block mb-2 text-sm">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border p-2 rounded mb-4" placeholder="********" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
