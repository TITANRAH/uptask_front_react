//TODO: AXIOS 2
// ASI LLAMAMOS A LAS VARIABLES DE ENTORNO EN VITE
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  // TODO: INTERCEPTORS DE AXIOS 2
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
