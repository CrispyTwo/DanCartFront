import { Product } from "./product.types";

export type ShoppingCart = {
  total: number;
  items: CartItem[];
};

export type CartItem = {
  quantity: number;
  total: number;
  product: Product;
  color: string;
  size: string;
};