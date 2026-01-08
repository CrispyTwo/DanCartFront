import { HttpService } from "./http-service"

export class ApiService extends HttpService {
  async get(path: string): Promise<any> {
    return await this.fetch(path, "GET", "");
  }

  async post(path: string, payload: string): Promise<any> {
    return await this.fetch(path, "POST", payload);
  }

  async put(path: string, payload: string): Promise<any> {
    return await this.fetch(path, "PUT", payload);
  }

  async delete(path: string, payload: string): Promise<any> {
    return await this.fetch(path, "DELETE", payload);
  }
}