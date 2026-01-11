import React, { useEffect, useState } from "react";
import { assignSubjectToTrainer } from "../services/TrainerService";
import { getAllSubjects } from "../services/SubjectService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../App.css";

import {
  getAllTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer
} from "../services/TrainerService";

function TrainerComponent() {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");  
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [editingTrainerId, setEditingTrainerId] = useState(null);
  const [subjects, setSubjects] = useState([]);


  // Load trainers from backend
  const loadTrainers = () => {
    getAllTrainers().then((res) => {
      setTrainers(res.data);
    });
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  useEffect(() => {
  getAllSubjects()
    .then((res) => {
      setSubjects(res.data);
      console.log(res.data);

    })
    .catch(() => {
      toast.warning("Failed to load subjects");
    });
}, []);
   
 


  // Add new trainer
  const handleAdd = () => {
    if (!name || !email || !phone) {
      toast.warning("All fields are required!");
      return;
    }

    addTrainer({ name, email, phone }).then(() => {
      resetForm();
      loadTrainers();
    });
  };

  // Update trainer
  const handleUpdate = () => {
    if (!name || !email || !phone) {
      toast.warning("All fields are required!");
      return;
    }

    updateTrainer(editingTrainerId, {
      name,
      email,
      phone
    }).then(() => {
      resetForm();
      loadTrainers();
    });
  };

  // Edit trainer (fill form)
  const handleEdit = (trainer) => {
    setEditingTrainerId(trainer.id);
    setName(trainer.name);
    setEmail(trainer.email);
    setPhone(trainer.phone);
  };

  // Cancel edit
  const handleCancel = () => {
    resetForm();
  };

  // Delete trainer
  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This trainer will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTrainer(id).then(() => {
        loadTrainers();
        Swal.fire(
          "Deleted!",
          "Trainer has been deleted successfully.",
          "success"
        );
      });
    }
  });
};


  // Assign subject to trainer
const handleAssign = (trainerId) => {
  if (!trainerId) {
    toast.warning("Please select a trainer");
    return;
  }

  if (!selectedSubjectId) {
    toast.warning("Please select a subject");
    return;
  }

  assignSubjectToTrainer(trainerId, selectedSubjectId)
    .then(() => {
      toast.success("Subject assigned successfully");
    })
    .catch((err) => {
      console.error(err);
      toast.error("Assignment failed");
    });
};



  // Reset form
  const resetForm = () => {
    setEditingTrainerId(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
  <div className="container">

    {/* Trainer Management */}
    <div className="card">
      <h2>Trainer Management</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {editingTrainerId ? (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleAdd}>Add Trainer</button>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.id}</td>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.phone}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => handleEdit(trainer)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(trainer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Assign Subject */}
    <div className="card">
      <h3>Assign Subject to Trainer</h3>

      <select
        value={selectedSubjectId}
        onChange={(e) => setSelectedSubjectId(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setEditingTrainerId(e.target.value)}
      >
        <option value="">Select Trainer</option>
        {trainers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <button onClick={() => handleAssign(editingTrainerId)}>
        Assign
      </button>
    </div>
  </div>
);
}

export default TrainerComponent;

