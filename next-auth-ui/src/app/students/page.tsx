"use client";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name.trim() || !email.trim()) return;
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div className="students-page-root">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-title">🎓 Student Management</div>
        <div className="navbar-count">
          {students.length} {students.length === 1 ? 'student' : 'students'}
        </div>
      </nav>

      {/* Add Student Form Card */}
      <div className="form-card">
        <h2>Add New Student</h2>
        <div className="form-row">
          <input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <button onClick={addStudent} className="add-btn">
            Add
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="students-list-section">
        <h3>Student List</h3>
        {students.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📚</span>
            <p>No students yet. Add your first student above!</p>
          </div>
        ) : (
          <div className="students-grid">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <div className="student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-email">{student.email}</div>
                  <div className="student-id">ID: {student.id}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .students-page-root {
          min-height: 100vh;
          background: #f6f8fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .navbar {
          width: 100%;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .navbar-title {
          font-size: 28px;
          font-weight: 700;
          color: #2d3a4a;
        }
        .navbar-count {
          background: #e3e9f6;
          color: #3b4a6b;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 500;
        }
        .form-card {
          background: #fff;
          max-width: 700px;
          margin: 40px auto 24px auto;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          padding: 32px 28px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .form-card h2 {
          margin-bottom: 18px;
          color: #2d3a4a;
          font-size: 22px;
        }
        .form-row {
          display: flex;
          gap: 16px;
          width: 100%;
        }
        .input {
          flex: 1;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          background: #f6f8fa;
          color: #2d3a4a;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus {
          border-color: #667eea;
        }
        .add-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(90deg, #667eea 0%, #5fc6ff 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .add-btn:hover {
          background: linear-gradient(90deg, #5fc6ff 0%, #667eea 100%);
          transform: translateY(-2px);
        }
        .students-list-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px 40px 16px;
        }
        .students-list-section h3 {
          color: #2d3a4a;
          font-size: 20px;
          margin-bottom: 18px;
        }
        .empty-state {
          text-align: center;
          color: #8b8b9f;
          padding: 40px 0;
        }
        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }
        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .student-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          padding: 24px 18px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .student-card:hover {
          box-shadow: 0 6px 24px rgba(102, 126, 234, 0.13);
          transform: translateY(-2px);
        }
        .student-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #5fc6ff 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
        }
        .student-info {
          flex: 1;
        }
        .student-name {
          font-size: 18px;
          font-weight: 600;
          color: #2d3a4a;
        }
        .student-email {
          font-size: 15px;
          color: #3b4a6b;
          margin-bottom: 2px;
        }
        .student-id {
          font-size: 13px;
          color: #8b8b9f;
        }
        @media (max-width: 700px) {
          .form-card, .students-list-section {
            max-width: 100%;
            padding: 0 6px;
          }
          .form-row {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
} 