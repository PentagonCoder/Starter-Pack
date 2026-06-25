import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response received");

    return response;
  },
  (error) => {
    console.log("API Error");

    return Promise.reject(error);
  }
);

export default api;