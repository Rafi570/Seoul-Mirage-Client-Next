import { AxiosInstance } from "axios";
import { ICartResponse, ICartItem } from "@/types/cart";

interface AddToCartRequest {
  userEmail: string;
  items: ICartItem[]; 
  totalAmount?: number;
  status?: string;
}

export const addToCartApi = async (
  axios: AxiosInstance, 
  cartData: AddToCartRequest
): Promise<ICartResponse> => {
  const res = await axios.post<ICartResponse>("/api/orders/checkout", cartData);
  return res.data;
};

export const fetchCartApi = async (
  axios: AxiosInstance, 
  email: string
): Promise<ICartResponse> => {
  const res = await axios.get<ICartResponse>(`/api/cart/${email}`);
  return res.data;
};