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

export type AuthResponse = {
  user: string;
  token: string;
}

export type JwtPayload = {
  sub?: string;
  email?: string;
  jti?: string;
  iat?: number;
  exp?: number;

  [claim: string]: any;
};
