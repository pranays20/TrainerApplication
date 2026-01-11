import React, { useEffect, useState } from "react";
import { getAllTrainers } from "../services/TrainerService";
import { getAllSubjects } from "../services/SubjectService";
import { assignSubject } from "../services/TrainerSubjectService";

function TrainerSubjectComponent() {
  const [trainers, setTrainers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    getAllTrainers().then(res => setTrainers(res.data));
    getAllSubjects().then(res => setSubjects(res.data));
  }, []);

  const handleAssign = () => {
    if (!trainerId || !subjectId) {
      toast.warning("Select both trainer and subject");
      return;
    }

    assignSubject(trainerId, subjectId).then(() => {
      toast.warning("Subject assigned to trainer successfully");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assign Subject to new Trainer</h2>

      <select onChange={(e) => setTrainerId(e.target.value)}>
        <option value="">Select Trainer</option>
        {trainers.map(t => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSubjectId(e.target.value)}>
        <option value="">Select Subject</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button onClick={handleAssign}>Assign</button>
    </div>
  );
}

export default TrainerSubjectComponent;
