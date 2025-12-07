import { Product } from "./Product";

export type ShoppingCart = {
    total: number;
    items: CartItem[];
};

export type CartItem = {
    quantity: number;
    total: number;
    product: Product;
    image?: string;
};