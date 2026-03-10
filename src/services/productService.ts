import { AxiosInstance } from "axios";
import { IProduct } from "@/types/product";

const productCache = new Map<string, IProduct[]>();

export const fetchBestsellers = async (axios: AxiosInstance): Promise<IProduct[]> => {
  const cacheKey = "bestsellers";
  if (productCache.has(cacheKey)) return productCache.get(cacheKey)!;

  const res = await axios.get<{ data: IProduct[] }>("/api/products?page=1&limit=4");
  const data = res.data.data || [];
  productCache.set(cacheKey, data);
  return data;
};

export const fetchAllProducts = async (axios: AxiosInstance): Promise<IProduct[]> => {
  const cacheKey = "all_products";
  if (productCache.has(cacheKey)) return productCache.get(cacheKey)!;

  const res = await axios.get<IProduct[]>("/api/products");
  const data = res.data || [];
  productCache.set(cacheKey, data);
  return data;
};