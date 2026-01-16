// import React, { useEffect, useState } from "react";
// import { assignSubjectToTrainer } from "../services/TrainerService";
// import { getAllSubjects } from "../services/SubjectService";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import "../App.css";

// import {
//   getAllTrainers,
//   addTrainer,
//   updateTrainer,
//   deleteTrainer
// } from "../services/TrainerService";

// function TrainerComponent() {
//   const [trainers, setTrainers] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");  
//   const [selectedSubjectId, setSelectedSubjectId] = useState("");
//   const [editingTrainerId, setEditingTrainerId] = useState(null);
//   const [subjects, setSubjects] = useState([]);

//   const [trainerSubjects, setTrainerSubjects] = useState([]);

  


//   // Load trainers from backend
//   const loadTrainers = () => {
//     getAllTrainers().then((res) => {
//       setTrainers(res.data);
//     });
//   };

  

//   useEffect(() => {
//     loadTrainers();
//   }, []);

//   useEffect(() => {
//   getAllSubjects()
//     .then((res) => {
//       setSubjects(res.data);
//       console.log(res.data);

//     })
//     .catch(() => {
//       toast.warning("Failed to load subjects");
//     });
// }, []);
   

//   useEffect(() => {
//     fetch("http://localhost:8080/api/trainer-subject/all")
//       .then((response) => response.json())  
//       .then((data) => setTrainerSubjects(data));
//   }, []);

//   // Add new trainer
//   const handleAdd = () => {
//     if (!name || !email || !phone) {
//       toast.warning("All fields are required!");
//       return;
//     }

//     addTrainer({ name, email, phone }).then(() => {
//       resetForm();
//       loadTrainers();
//     });
//   };

//   // Update trainer
//   const handleUpdate = () => {
//     if (!name || !email || !phone) {
//       toast.warning("All fields are required!");
//       return;
//     }

//     updateTrainer(editingTrainerId, {
//       name,
//       email,
//       phone
//     }).then(() => {
//       resetForm();
//       loadTrainers();
//     });
//   };

//   // Edit trainer (fill form)
//   const handleEdit = (trainer) => {
//     setEditingTrainerId(trainer.id);
//     setName(trainer.name);
//     setEmail(trainer.email);
//     setPhone(trainer.phone);
//   };

//   // Cancel edit
//   const handleCancel = () => {
//     resetForm();
//   };

//   // Delete trainer
//   const handleDelete = (id) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "This trainer will be permanently deleted!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       deleteTrainer(id).then(() => {
//         loadTrainers();
//         Swal.fire(
//           "Deleted!",
//           "Trainer has been deleted successfully.",
//           "success"
//         );
//       });
//     }
//   });
// };


//   // Assign subject to trainer
// const handleAssign = (trainerId) => {
//   if (!trainerId) {
//     toast.warning("Please select a trainer");
//     return;
//   }

//   if (!selectedSubjectId) {
//     toast.warning("Please select a subject");
//     return;
//   }

//   assignSubjectToTrainer(trainerId, selectedSubjectId)
//     .then(() => {
//       toast.success("Subject assigned successfully");
//     })
//     .catch((err) => {
//       console.error(err);
//       toast.error("Assignment failed");
//     });
// };



//   // Reset form
//   const resetForm = () => {
//     setEditingTrainerId(null);
//     setName("");
//     setEmail("");
//     setPhone("");
//   };

//   return (
//   <div className="container">

//     {/* Trainer Management */}
//     <div className="card">
//       <h2>Trainer Management</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       {editingTrainerId ? (
//         <>
//           <button onClick={handleUpdate}>Update</button>
//           <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
//             Cancel
//           </button>
//         </>
//       ) : (
//         <button onClick={handleAdd}>Add Trainer</button>
//       )}

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainers.map((trainer) => (
//             <tr key={trainer.id}>
//               <td>{trainer.id}</td>
//               <td>{trainer.name}</td>
//               <td>{trainer.email}</td>
//               <td>{trainer.phone}</td>
//               <td>
//                 <button
//                   className="edit"
//                   onClick={() => handleEdit(trainer)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete"
//                   onClick={() => handleDelete(trainer.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Assign Subject */}
//     <div className="card">
//       <h3>Assign Subject to Trainer</h3>

//       <select
//         value={selectedSubjectId}
//         onChange={(e) => setSelectedSubjectId(e.target.value)}
//       >
//         <option value="">Select Subject</option>
//         {subjects.map((s) => (
//           <option key={s.id} value={s.id}>
//             {s.name}
//           </option>
//         ))}
//       </select>

//       <select
//         onChange={(e) => setEditingTrainerId(e.target.value)}
//       >
//         <option value="">Select Trainer</option>
//         {trainers.map((t) => (
//           <option key={t.id} value={t.id}>
//             {t.name}
//           </option>
//         ))}
//       </select>

//       <button onClick={() => handleAssign(editingTrainerId)}>
//         Assign
//       </button>
//     </div>


//           {/* Assigned Subjects List */}
//         <div className="card">
//         <h3>Assigned Subjects</h3>

//         {trainerSubjects.length === 0 ? (
//     <p>No assignments found</p>
//   ) : (
//     <table>
//       <thead>
//         <tr>
//           <th>Trainer Name</th>
//           <th>Subject Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {trainerSubjects.map((ts) => (
//           <tr key={ts.id}>
//             <td>{ts.trainer.name}</td>
//             <td>{ts.subject.name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )}
// </div>


//   </div>
// );
// }

// export default TrainerComponent;

import React, { useEffect, useState } from "react";
import {
  getAllTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  assignSubjectToTrainer
} from "../services/TrainerService";
import { getAllSubjects } from "../services/SubjectService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../App.css";

function TrainerComponent() {
  const [trainers, setTrainers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [trainerSubjects, setTrainerSubjects] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [editingTrainerId, setEditingTrainerId] = useState(null);

  /* ================= VALIDATIONS ================= */
  const isValidName = (name) => /^[A-Za-z ]+$/.test(name);
  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  /* ================= LOAD DATA ================= */
  const loadTrainers = () => {
    getAllTrainers().then((res) => setTrainers(res.data));
  };

  const loadSubjects = () => {
    getAllSubjects()
      .then((res) => setSubjects(res.data))
      .catch(() => toast.error("Failed to load subjects"));
  };

  const loadTrainerSubjects = () => {
    fetch("http://localhost:8080/api/trainer-subject/all")
      .then((res) => res.json())
      .then((data) => setTrainerSubjects(data))
      .catch(() => toast.error("Failed to load assignments"));
  };

  useEffect(() => {
    loadTrainers();
    loadSubjects();
    loadTrainerSubjects();
  }, []);

  /* ================= ADD TRAINER ================= */
  const handleAdd = () => {
    if (!name || !email || !phone) {
      toast.warning("All fields are required");
      return;
    }
    if (!isValidName(name)) {
      toast.error("Name must contain only letters");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Email must end with @gmail.com");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Phone must be exactly 10 digits");
      return;
    }

    addTrainer({ name, email, phone }).then(() => {
      toast.success("Trainer added successfully");
      resetForm();
      loadTrainers();
    });
  };

  /* ================= UPDATE TRAINER ================= */
  const handleUpdate = () => {
    if (!name || !email || !phone) {
      toast.warning("All fields are required");
      return;
    }
    if (!isValidName(name)) {
      toast.error("Name must contain only letters");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Email must end with @gmail.com");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Phone must be exactly 10 digits");
      return;
    }

    updateTrainer(editingTrainerId, { name, email, phone }).then(() => {
      toast.success("Trainer updated successfully");
      resetForm();
      loadTrainers();
    });
  };

  /* ================= DELETE TRAINER ================= */
  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This trainer will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(240, 17, 17)",
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

  /* ================= EDIT ================= */
  const handleEdit = (trainer) => {
    setEditingTrainerId(trainer.id);
    setName(trainer.name);
    setEmail(trainer.email);
    setPhone(trainer.phone);
  };

  /* ================= ASSIGN SUBJECT ================= */
  const handleAssign = () => {
    if (!selectedTrainerId || !selectedSubjectId) {
      toast.warning("Select both trainer and subject");
      return;
    }

    assignSubjectToTrainer(selectedTrainerId, selectedSubjectId)
      .then(() => {
        toast.success("Subject assigned successfully");
        loadTrainerSubjects();
      })
      .catch(() => toast.error("Assignment failed"));
  };

  const resetForm = () => {
    setEditingTrainerId(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      {/* Trainer Management */}
      <div className="card">
        <h2>Trainer Management</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            /^[A-Za-z ]*$/.test(e.target.value) && setName(e.target.value)
          }
        />

        <input
          placeholder="Email (must end with @gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone (10 digits)"
          maxLength="10"
          value={phone}
          onChange={(e) =>
            /^[0-9]*$/.test(e.target.value) && setPhone(e.target.value)
          }
        />

        {editingTrainerId ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={resetForm}>Cancel</button>
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
            {trainers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(t)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(t.id)}
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

        <select onChange={(e) => setSelectedSubjectId(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedTrainerId(e.target.value)}>
          <option value="">Select Trainer</option>
          {trainers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <button onClick={handleAssign}>Assign</button>
      </div>

      {/* Assigned Subjects */}
      <div className="card">
        <h3>Assigned Subjects</h3>

        {trainerSubjects.length === 0 ? (
          <p>No assignments found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {trainerSubjects.map((ts) => (
                <tr key={ts.id}>
                  <td>{ts.trainer.name}</td>
                  <td>{ts.subject.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TrainerComponent;
