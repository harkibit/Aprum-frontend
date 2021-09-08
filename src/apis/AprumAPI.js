import axios from "axios";

const AprumAPI = axios.create({
  baseURL: "http://aprum-api.herokuapp.com/api/v1",
  timeout: 50000,
});

AprumAPI.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default AprumAPI;
