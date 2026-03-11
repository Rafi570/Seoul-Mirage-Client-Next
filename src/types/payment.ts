// src/types/payment.ts

import { IOrder } from "./order";

export interface IShippingAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
}

export interface IPaymentInfo {
  orderIds: string[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
}

export interface ICheckoutData {
  selectedOrders: IOrder[];
  totalPayable: number;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
}