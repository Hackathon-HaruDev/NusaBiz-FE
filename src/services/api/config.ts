import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const hasToken = localStorage.getItem("access_token");

      if (hasToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userToken");

        if (window.location.pathname !== "/Auth") {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/Auth";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
