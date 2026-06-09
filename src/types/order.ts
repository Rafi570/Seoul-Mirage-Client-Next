export interface IOrderItem {
  productId?: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  name: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  userEmail: string;
  items: IOrderItem[];
  totalAmount: number;
  status: "Unpaid" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: IShippingAddress;
  transactionId?: string;
  createdAt: string;
  updatedAt?: string;
}