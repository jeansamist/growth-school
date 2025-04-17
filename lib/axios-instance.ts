import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://server11.vps.webdock.cloud",
});
axiosInstance.interceptors.request.use((config) => {
  return config;
});
export { axiosInstance };
