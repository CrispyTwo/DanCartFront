import { JwtPayload, LoginRequest, RegisterRequest } from "../models/Authentication";
import { ApiService } from "../api/ApiService";
import { LocalStorageService } from "./LocalStorageService";

export class AuthenticationService {
  private readonly api: ApiService;
  private readonly storage: LocalStorageService;

  constructor(tokenKey: string = "dan_cart_jwt") {
    this.api = new ApiService();
    this.storage = new LocalStorageService(tokenKey);
  }

  async login(dto: LoginRequest): Promise<string> {
    const payload = JSON.stringify(dto);
    const res = await this.api.post("/auth/login", 1, payload);
    const token = this._extractToken(res);
    this.storage.setToken(token);
    return token;
  }

  async register(dto: RegisterRequest): Promise<string> {
    const payload = JSON.stringify(dto);
    const res = await this.api.post("/auth/register", 1, payload);
    const token = this._extractToken(res);
    this.storage.setToken(token);
    return token;
  }

  logout(): void {
    this.storage.removeToken();
  }

  getToken(): string | null {
    return this.storage.getToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = this.decodeJwt(token);
    if (!payload) return true;

    if (payload.exp && typeof payload.exp === "number") {
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    }
    
    return true;
  }

  getUserId(): string | undefined {
    return this.decodeJwt()?.sub;
  }

  getEmail(): string | undefined {
    return this.decodeJwt()?.email;
  }

  decodeJwt(token: string | null = null): JwtPayload | null {
    token = token ?? this.getToken();
    if (!token) return null;

    try {
      const payloadPart = token.split(".")[1];
      if (!payloadPart) return null;

      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

      const json =
        typeof atob === "function"
          ? atob(padded)
          : Buffer.from(padded, "base64").toString("utf8");

      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }

  getRoles(): string[] {
    const payload = this.decodeJwt();
    if (!payload) return [];
    
    return [payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
  }

  private _extractToken(res: any): string {
    if (!res) throw new Error("Empty response from auth endpoint");

    if (typeof res === "string") return res;
    if (typeof res === "object" && typeof res.token === "string") return res.token;
    throw new Error("Unable to parse token from response");
  }
}
