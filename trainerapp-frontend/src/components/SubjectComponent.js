import React, { useEffect, useState } from "react";
import { getAllSubjects, addSubject } from "../services/SubjectService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function SubjectComponent() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const loadSubjects = () => {
    getAllSubjects().then((res) => {
      setSubjects(res.data);
    });
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleAdd = () => {
    if (!name) {
      toast.error("Subject name required");
      return;
    }

    addSubject({ name }).then(() => {
      setName("");
      loadSubjects();
      toast.success("Subject added successfully");
    });
  };

 return (
  <div
    style={{
      background: "#abf2fc",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      maxWidth: "960px",
      margin: "0 auto"
    }}
  >
    <h2 style={{ marginBottom: "15px" }}>Subject 2 Management</h2>

    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
      <input
        type="text"
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <button
        onClick={handleAdd}
        style={{
          background: "#0d6efd",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add Subject
      </button>
    </div>

    <ul>
      {subjects.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  </div>
);

}
export default SubjectComponent;











