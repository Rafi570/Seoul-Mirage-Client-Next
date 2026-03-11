import { IOrder } from "./order"; // আপনার আগের তৈরি করা অর্ডারের ইন্টারফেস

export interface IDashboardStats {
  totalRevenue: string;
  totalOrders: number;
  totalProducts: number;
  avgOrderValue: string | number;
  recentOrders: IOrder[];
  categoryData: ICategoryPieData[];
  revenueTrend: IRevenueTrendData[];
}

export interface ICategoryPieData {
  name: string;
  value: number;
}

export interface IRevenueTrendData {
  date: string;
  amount: number;
}

export interface IProduct {
  _id: string;
  category: string;
  [key: string]: any;
}