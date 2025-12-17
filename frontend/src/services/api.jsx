import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api", // backend URL
  withCredentials: true,
});

export default api;
