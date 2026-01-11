import axios from "axios";

const API_URL = "http://localhost:8080/api/trainer-subject";

export const assignSubject = (trainerId, subjectId) =>
  axios.post(`${API_URL}/${trainerId}/${subjectId}`);
