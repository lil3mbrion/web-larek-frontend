import { IWebApi } from "../../types/components/model/IWebApi";
import { Api } from "../base/api";
import { IProduct } from "../../types/components/model/IProduct";
import { IOrder } from "../../types/components/model/IOrder";
import { IOrderResponse } from "../../types/components/model/IOrderResponse";

export class WebApi implements IWebApi {
  api: Api;

  constructor(baseUrl: string) {
    this.api = new Api(baseUrl);
  }

  getProducts(): Promise<{ total: number; items: IProduct[] }> {
    return this.api.get('/product') as Promise<{ total: number; items: IProduct[] }>
  }

  getProduct(id: string): Promise<IProduct> {
    return this.api.get(`/product/${id}`) as Promise<IProduct>
  }

  createOrder(order: IOrder): Promise<IOrderResponse> {
    return this.api.post('/order', order) as Promise<IOrderResponse>;
  }
}