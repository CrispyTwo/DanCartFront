export class LocalStorageService {
  private readonly tokenKey: string;

  constructor(tokenKey: string) {
    this.tokenKey = tokenKey;
  }

  isAvailable(): boolean {
    try {
      return typeof window !== "undefined" && !!window.localStorage;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    if (!this.isAvailable()) return null;
    try {
      return window.localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  setToken(token: string | null): void {
    if (!this.isAvailable()) return;
    try {
      if (token === null) window.localStorage.removeItem(this.tokenKey);
      else window.localStorage.setItem(this.tokenKey, token);
    } catch { }
  }

  removeToken(): void {
    this.setToken(null);
  }
}
