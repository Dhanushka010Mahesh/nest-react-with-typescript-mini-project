import axios from "axios";

// No need to import AxiosInstance explicitly
const api = axios.create({
  baseURL: "http://localhost:6050/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;