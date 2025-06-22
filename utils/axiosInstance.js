// utils/axiosInstance.js
import axios from "axios";

// Automatically adds base URL and headers (like token) if needed
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", // Your FastAPI backend URL
  baseURL: "https://innovoltics-3dprinters.onrender.com/api", // Your FastAPI backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
