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
  options: ProductOption[];
  variants: ProductVariant[];
  images: string[];
};

export type ProductOption = {
  name: string;
  values: string[];
}

export type ProductVariant = {
  color: string;
  size: string;
  stock: number;
}