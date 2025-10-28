import axios from "axios";
import { toast } from "react-toastify";

/* Axios instance */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/* Attach token */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* Global 401 / 403 handler */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const code = err.response?.status;
    if (code === 401 || code === 403) {
      localStorage.removeItem("token");
      try {
        toast.error("Session expired – please log in again.", { autoClose: 2500 });
      } catch {}
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
