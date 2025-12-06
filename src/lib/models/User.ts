export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Customer = User & {
  createdAt: string;
  ordersCount: number;
  totalSpent: number;
  averageOrder: number;
  isActive: boolean;
};
