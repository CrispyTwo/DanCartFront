import { AuthState, LoginRequest, RegisterRequest } from "@/src/types/auth.types";
import { ApiService } from "../helpers/api-service";

export class AuthenticationService {
  private readonly apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async login(dto: LoginRequest): Promise<AuthState> {
    const payload = JSON.stringify(dto);
    await this.apiService.post("/auth/login", payload);
    return this.getState();
  }

  async register(dto: RegisterRequest): Promise<AuthState> {
    const payload = JSON.stringify(dto);
    await this.apiService.post("/auth/register", payload);
    return this.getState();
  }

  async logout() {
    await this.apiService.post("/auth/logout", "");
    return this.getState();
  }

  async getState(): Promise<AuthState> {
    return await this.apiService.get("/auth/session") as AuthState;
  }
}
