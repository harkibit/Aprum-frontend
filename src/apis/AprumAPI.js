import axios from "axios";

const AprumAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 20000,
});

AprumAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AprumAPI;
