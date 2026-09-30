import axiosInstance from "./axiosInstance";

export const getCategoryBreakdown = () =>
  axiosInstance.get("/reports/category-breakdown");
export const getIncomeVsExpense = () =>
  axiosInstance.get("/reports/income-vs-expense");
