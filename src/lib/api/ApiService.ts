export class ApiService {
  private readonly baseUrl: string;
  constructor(baseUrl: string | undefined = undefined) {
    if (baseUrl === undefined) {
      baseUrl = process.env.NEXT_PUBLIC_API_URL
      if (baseUrl === undefined) {
        throw new Error("No api url provided, contact support.")
      }
    }
    
    this.baseUrl = baseUrl;
  }

  async get(path: string, version: number, token: string = ""): Promise<any> {
    return await this.fetch(path, version, "GET", token);
  }

  async post(path: string, version: number, payload: string, token: string = ""): Promise<any> {
    return await this.fetch(path, version, "POST", token, payload);
  }

  async delete(path: string, version: number, payload: string, token: string): Promise<any> {
    return await this.fetch(path, version, "DELETE", token, payload);
  }

  private async fetch(path: string, version: number, method: string, token: string, payload: string = ""): Promise<any> {
    const uri = `${this.baseUrl}/api/v${version}${path}`;
    const response = await fetch(uri, {
      headers: this.getHeaders(token),
      method: method,
      ...(method !== "GET" && payload ? { body: payload } : {})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  private getHeaders(token: string): HeadersInit {
    if (token == "") {
      return  { "Content-Type": "application/json" }
    }

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }
}
