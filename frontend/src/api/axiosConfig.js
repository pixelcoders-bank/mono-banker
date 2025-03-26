import axios from "axios";

// Configuración de axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;