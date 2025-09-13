
import axios from "axios";


const BASE = "http://localhost:5000/api";


const api = axios.create({
  baseURL: `${BASE}/cart`,
});

// interceptor برای گذاشتن توکن روی همه درخواست‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenUserLogin");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// methods
export const cartApi = {
  getCart: () => api.get("/").then((res) => res.data),
  add: (productId, quantity = 1) =>
    api.post("/add", { productId, quantity }).then((res) => res.data),
  update: (productId, quantity) =>
    api.put("/update", { productId, quantity }).then((res) => res.data),
  remove: (productId) => api.delete(`/remove/${productId}`).then((res) => res.data),
  clear: () => api.delete("/clear").then((res) => res.data),
};
