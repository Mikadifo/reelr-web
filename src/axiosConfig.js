import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const unauthorizedInterceptor = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return Promise.reject(error);
};

api.interceptors.request.use(authInterceptor);
api.interceptors.request.use((response) => response, unauthorizedInterceptor);

export default api;
