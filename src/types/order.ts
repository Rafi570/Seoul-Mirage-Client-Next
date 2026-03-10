export interface IOrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  email: string;
  items: IOrderItem[];
  totalAmount: number;
  status: "Unpaid" | "Paid" | "Shipped" | "Delivered";
  createdAt: string;
}