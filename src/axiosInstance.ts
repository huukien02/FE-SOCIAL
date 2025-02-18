import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Config
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken")?.replace(/"/g, "");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
