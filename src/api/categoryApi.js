import axiosInstance from "./axiosInstance";

export const getCategories = (params) =>
  axiosInstance.get("/categories", { params });
export const createCategory = (payload) =>
  axiosInstance.post("/categories", payload);
