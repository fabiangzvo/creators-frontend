import axios, { AxiosInstance } from "axios";

export function createAxiosInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
