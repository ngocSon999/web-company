// src/services/authService.ts
import axiosClient from "../api/axiosClient";
import type { LoginResponse } from "../types/auth";

interface LoginPayload {
  email: string;
  password: string;
}

const authService = {
  login(data: LoginPayload): Promise<LoginResponse>  {
    return axiosClient.post("/customer/login", data);
  },

  logout() {
    return axiosClient.post("/customer/logout");
  },

  me(): Promise<LoginResponse>  {
    return axiosClient.get("/customer/profile");
  },
};

export default authService;
