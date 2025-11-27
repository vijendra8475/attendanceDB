import React, { useState } from "react";
import { api } from "../services/api";

export default function StudentForm({ onAdded }) {
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleAdd = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    try {
      const res = await api.post("/students", { name, registrationNo: reg });
      setMsg("Added");
      setName(""); setReg("");
      onAdded && onAdded(res.data);
    } catch (err) {
      setMsg("Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="bg-white p-3 rounded shadow">
      <div className="mb-2">
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-2">
        <input placeholder="Registration No." value={reg} onChange={(e)=>setReg(e.target.value)} className="border p-2 rounded w-full" />
      </div>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">{saving ? "Adding..." : "Add Student"}</button>
      <div className="text-sm text-gray-500 mt-2">{msg}</div>
    </form>
  );
}
