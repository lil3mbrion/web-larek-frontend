import { CardCompactSettings } from "./CardCompactSettings";

export interface BasketSettings {
  modalTitle: string;
  itemListContainer: HTMLUListElement;
  itemList: Map<string, CardCompactSettings>;
  totalPrice: number;
  button: HTMLButtonElement;
}