export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  colors: string;
  price: number;
  stock: number;
  isActive: boolean;
  lowStockThreshold: number;
};