import axios from "axios";

const API_URL = "http://localhost:8080/api/subjects";

export const getAllSubjects = () => axios.get(API_URL);

export const addSubject = (subject) => axios.post(API_URL, subject);
