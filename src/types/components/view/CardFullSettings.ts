import { ProductCategory } from "../..";

export interface CardFullSettings {
  description: string;
  image: string;
  addButton: HTMLButtonElement;
  title: string;
  category: ProductCategory;
  price: number | null;
  fullClass: string;
  isFull: boolean;
}