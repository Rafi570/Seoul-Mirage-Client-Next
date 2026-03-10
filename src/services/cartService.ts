import { AxiosInstance } from "axios";
import { ICartResponse, ICartItem } from "@/types/cart";

interface AddToCartRequest {
  userEmail: string;
  items: ICartItem[]; 
  totalAmount?: number;
  status?: string;
}

const cartCache = new Map<string, ICartResponse>();

export const addToCartApi = async (
  axios: AxiosInstance, 
  cartData: AddToCartRequest
): Promise<ICartResponse> => {
  const res = await axios.post<ICartResponse>("/api/orders/checkout", cartData);
  cartCache.delete(cartData.userEmail);
  return res.data;
};

export const fetchCartApi = async (
  axios: AxiosInstance, 
  email: string 
): Promise<ICartResponse> => {

  if (cartCache.has(email)) return cartCache.get(email)!;

  const res = await axios.get<ICartResponse>(`/api/orders/user/${email}`);
  
  cartCache.set(email, res.data);
  return res.data;
};