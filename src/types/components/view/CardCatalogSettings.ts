import { ProductCategory } from "../..";

export interface CardCatalogSettings {
  image: string;
  title: string;
  category: ProductCategory;  
  price: number | null;
  openButton: HTMLButtonElement;
}