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
  const [feedback, setFeedback] = useState({ message: "", isError: false });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data || []);
      } catch (err) {
        setStudents([]);
        setFeedback({ message: "Failed to load students.", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // store checked ids
  const [presentIds, setPresentIds] = useState(new Set());

  const toggle = (id) => {
    setPresentIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback({ message: "", isError: false });
    try {
      const payload = {
        date: selectedDate,
        present: Array.from(presentIds),
      };
      await api.post("/attendance/mark", payload);
      setFeedback({ message: "Attendance saved successfully.", isError: false });
      setPresentIds(new Set()); // Clear selection on successful save
    } catch (err) {
      setFeedback({ message: err?.response?.data?.message || "Save failed. Please try again.", isError: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Mark Attendance</h1>

      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm">Date:</label>
        <input
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          type="date"
          className="border p-2 rounded"
        />
        <button
          onClick={() => {
            setPresentIds(new Set(students.map((s) => s._id)));
          }}
          className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
        >
          Mark All Present
        </button>
      </div>

      {loading ? (
        <div>Loading students...</div>
      ) : (
        <div className="bg-white rounded shadow p-4">
          {students.length === 0 ? (
            <div>
              {feedback.isError ? feedback.message : "No students found."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {students.map((st) => (
                <label
                  key={st._id}
                  className="flex items-center gap-3 border p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={presentIds.has(st._id)}
                    onChange={() => toggle(st._id)}
                  />
                  <div>
                    <div className="font-medium">{st.name}</div>
                    <div className="text-xs text-gray-500">
                      {st.registrationNo || st.email}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={saving}
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Attendance"}
        </button>
        {feedback.message && (
          <div className={`text-sm ${feedback.isError ? 'text-red-600' : 'text-gray-600'}`}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}
