import axios from "axios";

const getStorageItem = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (e) {}
  return null;
};

const removeStorageItem = (key: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (e) {}
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getStorageItem("access_token");
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
      const hasToken = getStorageItem("access_token");

      if (hasToken) {
        removeStorageItem("access_token");
        removeStorageItem("userToken");

        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/Auth"
        ) {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/Auth";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
