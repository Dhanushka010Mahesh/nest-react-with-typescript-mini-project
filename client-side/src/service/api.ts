import axios from "axios";

// No need to import AxiosInstance explicitly
//http://localhost:8080/api/v1/ spring boot
//OR
//http://localhost:6050/api/v1/ nestJS
const api = axios.create({
  baseURL: "http://localhost:6050/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;