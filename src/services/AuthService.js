import axios from "axios";
import { apiUrl } from "./ApiUrl";

const AuthService = axios.create({
  baseURL: apiUrl,

  // Allow browser to send HttpOnly cookies
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthService;
