import { Product } from "./product.types";

export type Order = {
  id: string;
  userId: string;
  name: string;
  orderDate: Date;
  orderStatus: number;
  phone: string;
  lines: OrderLine[];
  total: number;
  email: string;
};

export type OrderLine = {
  product: Product;
  quantity: number;
  unitPrice: number;
}