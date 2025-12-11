import { AuthenticationService } from "./auth/AuthenticationService";

export class ApiService {
  private readonly baseUrl: string;
  public readonly authService: AuthenticationService;

  constructor(authService?: AuthenticationService) {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("No api url provided, contact support.");
    }

    this.authService = authService ?? new AuthenticationService();
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getRoles().includes("Admin");
  }

  async get(path: string, version: number): Promise<any> {
    return await this.fetch(path, version, "GET");
  }

  async post(path: string, version: number, payload: string): Promise<any> {
    return await this.fetch(path, version, "POST", payload);
  }

  async put(path: string, version: number, payload: string): Promise<any> {
    return await this.fetch(path, version, "PUT", payload);
  }

  async delete(path: string, version: number, payload: string): Promise<any> {
    return await this.fetch(path, version, "DELETE", payload);
  }

  private async fetch(path: string, version: number, method: string, payload: string = ""): Promise<any> {
    const uri = `${this.baseUrl}/api/v${version}${path}`;

    const response = await fetch(uri, {
      headers: this.getHeaders(this.authService.getToken()),
      method: method,
      ...(method !== "GET" && payload ? { body: payload } : {})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  private getHeaders(token: string | null): HeadersInit {
    if (!token) {
      return { "Content-Type": "application/json" };
    }

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  }
}