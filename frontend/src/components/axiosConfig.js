import axios from "axios";

const AxiosExclusive= axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosExclusive.interceptors.request.use(
  config => {
    const adminToken = localStorage.getItem("token");
    const userToken = localStorage.getItem("tokenUserLogin");
    const token = adminToken || userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
export default AxiosExclusive;
