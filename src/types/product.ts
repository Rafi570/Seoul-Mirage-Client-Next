// আপনার বর্তমান ইন্টারফেস
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

// কার্টের জন্য আলাদা টাইপ (যা IProduct থেকে কিছু প্রপার্টি নেবে)
export interface ICartItem extends Pick<IProduct, '_id' | 'name' | 'price'> {
  productId: string; // MongoDB reference এর জন্য
  image: string;
  quantity: number;
}