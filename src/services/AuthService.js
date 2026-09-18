import axios from "axios";
import { apiUrl } from "./ApiUrl";

const AuthService = axios.create({
  baseURL: apiUrl,

  // Browser automatically sends HttpOnly cookies
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// Response interceptor
// 401 → refresh → retry original request
// --------------------------------------------------

AuthService.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // If there is no request config, just reject
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // --------------------------------------------------
    // ACCESS TOKEN EXPIRED
    // --------------------------------------------------

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      originalRequest._retry = true;

      try {
        // Browser automatically sends refreshToken cookie.
        // We never read the token in JavaScript.
        await AuthService.post("/auth/refresh");

        // Backend has created a new accessToken cookie.
        // Retry the original request.
        return AuthService(originalRequest);
      } catch (refreshError) {
        // --------------------------------------------------
        // REFRESH TOKEN EXPIRED / INVALID
        // --------------------------------------------------

        console.log("Session expired. Logging out...");

        try {
          // Clear accessToken and refreshToken cookies
          await AuthService.post("/auth/logout");
        } catch (logoutError) {
          console.error("Logout request failed:", logoutError);
        }

        // Tell the application that authentication has expired.
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AuthService;