import axios from "axios";

const isProduction = import.meta.env.VITE_PRODUCTION === "true";

const axiosClient = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_API_URL
    : "/api", 

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Frontend-Domain": window.location.hostname
  },
  withCredentials: false, // true nếu dùng cookie
});

/**
 * 👉 Request interceptor: gắn token nếu có
 */
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("customer_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
