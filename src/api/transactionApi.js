import axiosInstance from "./axiosInstance";

export const getTransactions = (params) =>
  axiosInstance.get("/transactions", { params });
export const createTransaction = (payload) =>
  axiosInstance.post("/transactions", payload);
export const updateTransaction = (id, payload) =>
  axiosInstance.put(`/transactions/${id}`, payload);
export const deleteTransaction = (id) =>
  axiosInstance.delete(`/transactions/${id}`);
export const suggestCategory = (description) =>
  axiosInstance.post("/transactions/suggest-category", { description });
export const getSavingsProgress = () =>
  axiosInstance.get("/transactions/savings");
