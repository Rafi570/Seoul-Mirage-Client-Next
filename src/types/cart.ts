import { IProduct } from "./product";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface ICartResponse {
  success: boolean;
  message?: string;
  data?: ICartItem[];
}
export interface CartItem extends IProduct {
  quantity: number;
}