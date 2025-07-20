import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/constants/appConfig";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  config => {
    if (!API_KEY) {
      return Promise.reject(
        new Error(
          "New York Times API key is not defined. Please set VITE_NYT_API_KEY in your environment variables."
        )
      );
    }

    config.params = {
      ...config.params,
      "api-key": config.params?.["api-key"] || API_KEY,
    };

    return config;
  },
  error => {
    if (process.env.NODE_ENV !== "production") {
      console.error("Request error:", error);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      error.message = "Network error. Please check your connection.";
    } else {
      switch (error.response.status) {
        case 401:
          error.message = "Unauthorized. Please check your API key.";
          break;
        case 429:
          error.message = "Too many requests. Please try again later.";
          break;
        case 500:
          error.message = "Server error. Please try again later.";
          break;
      }
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("Response error:", error);
    }

    return Promise.reject(error);
  }
);
