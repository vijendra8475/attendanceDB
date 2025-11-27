import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import AttendanceCard from "../components/AttendanceCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [sRes, stRes] = await Promise.all([
          api.get("/attendance/summary").catch(()=>({ data: null })),
          api.get("/students").catch(()=>({ data: [] }))
        ]);
        if (!mounted) return;
        setSummary(sRes.data || null);
        setStudents(stRes.data || []);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/mark" className="bg-green-600 text-white px-3 py-2 rounded">Mark Attendance</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AttendanceCard title="Total Students" value={summary?.totalStudents ?? students.length} />
            <AttendanceCard title="Present Today" value={summary?.presentToday ?? 0} />
            <AttendanceCard title="Absent Today" value={summary?.absentToday ?? 0} />
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="font-medium mb-3">Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.length === 0 ? (
                <div>No students found.</div>
              ) : (
                students.map((s) => (
                  <div key={s._id} className="border p-3 rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-gray-600">{s.registrationNo || s.email}</div>
                    </div>
                    <div>
                      {/* optional quick actions */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
