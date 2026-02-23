import axios from "axios";

const API_URL = "http://localhost:8080/api/trainers";
// const BASE_URL = "http://localhost:8080/api/trainer-subject/all";

export const getAllTrainers = () => axios.get(API_URL);

export const addTrainer = (trainer) =>
  axios.post(API_URL, trainer);

export const updateTrainer = (id, trainer) =>
  axios.put(`${API_URL}/${id}`, trainer);

export const deleteTrainer = (id) =>
  axios.delete(`${API_URL}/${id}`);

// export const assignSubjectToTrainer = (trainerId, subjectId) => {
//   return axios.post(
//     `${BASE_URL}/trainer-subject?trainerId=${trainerId}&subjectId=${subjectId}`
//   );
// };

// export const getTrainerSubjects = () => {
//   return axios.get("http://localhost:8080/api/trainer-subjects");
// };

export const assignSubjectToTrainer = (trainerId, subjectId) => {
  return axios.post(
    "http://localhost:8080/api/trainer-subject",
    null,
    {
      params: {
        trainerId,
        subjectId
      }
    }
  );
};

export const getTrainerSubjects = () => {
  return axios.get(
    "http://localhost:8080/api/trainer-subject/all"
  );
};


