import axios from "axios";

export const BASE_URL = import.meta.env.VITE_URL_API;

export const requestBackend = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
  },
});

export const setInterceptorRequestToken = (token, idToken = "") => {
  requestBackend.interceptors.request.use((config) => {
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      };
    }
    if (idToken) {
      config.headers["X-Line-Id-Token"] = idToken;
    }
    return config;
  });
};
