import { AxiosInstance } from "axios";

export const fetchBestsellers = async (axios: AxiosInstance) => {
  const res = await axios.get("/api/products?page=1&limit=4");
  return res.data.data || [];
};

export const fetchAllProducts = async (axios: AxiosInstance) => {
  const res = await axios.get("/api/products");
  return res.data || [];
};