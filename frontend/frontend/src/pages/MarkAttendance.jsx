import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    api.get("/students")
      .then((res) => { if (mounted) setStudents(res.data || []); })
      .catch(()=>{ if (mounted) setStudents([]); })
      .finally(()=>{ if (mounted) setLoading(false); });
    return ()=> mounted = false;
  }, []);

  // store checked ids
  const [presentIds, setPresentIds] = useState(new Set());

  const toggle = (id) => {
    setPresentIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        date: selectedDate,
        present: Array.from(presentIds)
      };
      const res = await api.post("/attendance/mark", payload);
      setMessage("Attendance saved.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Mark Attendance</h1>

      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm">Date:</label>
        <input value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)} type="date" className="border p-2 rounded" />
        <button onClick={()=>{ setPresentIds(new Set(students.map(s=>s._id))) }} className="ml-auto bg-blue-600 text-white px-3 py-1 rounded">Mark All Present</button>
      </div>

      {loading ? <div>Loading students...</div> : (
        <div className="bg-white rounded shadow p-4">
          {students.length === 0 ? <div>No students found.</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {students.map(st => (
                <label key={st._id} className="flex items-center gap-3 border p-2 rounded cursor-pointer">
                  <input type="checkbox" checked={presentIds.has(st._id)} onChange={() => toggle(st._id)} />
                  <div>
                    <div className="font-medium">{st.name}</div>
                    <div className="text-xs text-gray-500">{st.registrationNo || st.email}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button disabled={saving} onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Save Attendance"}
        </button>
        <div className="text-sm text-gray-600">{message}</div>
      </div>
    </div>
  );
}
