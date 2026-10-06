import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://campuscoin-backend-97dc7.containers.snapdeploy.app/api" });

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("cc_token") || sessionStorage.getItem("cc_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
