export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
};

export type AuthState = {
  isAuthenticated: boolean,
  user: {
    id: string,
    email: string,
    roles: string[],
  },
  exp: number,
}