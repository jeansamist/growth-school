import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://growth-school-adonisjs.onrender.com",
});
axiosInstance.interceptors.request.use((config) => {
  return config;
});
export { axiosInstance };
