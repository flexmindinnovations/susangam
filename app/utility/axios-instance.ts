import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

http.interceptors.request.use(
  async (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/home";
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default http;