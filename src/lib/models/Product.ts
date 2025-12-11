export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: string;
  price: number;
  stock: number;
  isActive: boolean;
  lowStockThreshold: number;
};