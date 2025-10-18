import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const t = sessionStorage.getItem("mm_token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
