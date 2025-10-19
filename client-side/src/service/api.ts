import axios from "axios";

const api = axios.create({
  baseURL: "http://72.60.100.226:7001/api/v1/",
  // baseURL: "http://localhost:7001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;