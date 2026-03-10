import { StaticImageData } from 'next/image';

export interface IngredientItem {
  title: string;
  img: StaticImageData;
  description?: string; 
}