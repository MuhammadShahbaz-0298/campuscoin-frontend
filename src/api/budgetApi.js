import axiosInstance from "./axiosInstance";

export const getBudgets = (params) => axiosInstance.get("/budgets", { params });
export const saveBudget = (payload) => axiosInstance.post("/budgets", payload);
