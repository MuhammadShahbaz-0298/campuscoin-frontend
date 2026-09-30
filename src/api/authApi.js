import axiosInstance from "./axiosInstance";

export const loginUser = (payload) =>
  axiosInstance.post("/auth/login", payload);
export const registerUser = (payload) =>
  axiosInstance.post("/auth/register", payload);
export const getCurrentUser = () => axiosInstance.get("/users/me");
