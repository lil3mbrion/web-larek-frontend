import { IProduct } from "./IProduct";
import { IOrder } from "./IOrder";
import { IOrderResponse } from "./IOrderResponse";

export interface IWebApi {
  getProducts: () => Promise<{ total: number; items: IProduct[] }>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: IOrder) => Promise<IOrderResponse>;
}