import axiosInstance from "./axiosInstance";

export const getInsights = (params) => axiosInstance.get("/insights", { params });
export const generateInsight = (month) =>
  axiosInstance.post("/insights/generate", { month });

export async function clearAllInsights() {
  return axiosInstance.delete("/insights/clear-all");
}
