export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  mainImage: string;
  images?: string[];
  description: string;
  details?: string;
  reviews_count?: number;
}
