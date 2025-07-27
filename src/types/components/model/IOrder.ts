import { Payment } from "../..";

export interface IOrder {
  payment?: Payment;       
  email?: string;   
  phone?: string;   
  address?: string;       
  total?: number;             
  items?: string[]
}