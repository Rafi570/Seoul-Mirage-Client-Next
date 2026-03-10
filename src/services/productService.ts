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

export const getCollectionsData = async (page: number = 1): Promise<IProduct[]> => {
  const limit = 8;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL  
  try {
    const res = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    
    const result = await res.json();
    return result.data || result;
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return [];
  }
};