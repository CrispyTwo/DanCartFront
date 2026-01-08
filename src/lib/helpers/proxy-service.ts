import { HttpService } from "./http-service"

export class ProxyService extends HttpService {
  async get(path: string, version: number): Promise<any> {
    return await this.fetchVersioned(path, "GET", "", version);
  }

  async post(path: string, version: number, payload: string): Promise<any> {
    return await this.fetchVersioned(path, "POST", payload, version);
  }

  async put(path: string, version: number, payload: string): Promise<any> {
    return await this.fetchVersioned(path, "PUT", payload, version);
  }

  async delete(path: string, version: number, payload: string): Promise<any> {
    return await this.fetchVersioned(path, "DELETE", payload, version);
  }

  private async fetchVersioned(path: string, method: string, payload: string, version: number): Promise<any> {
    return await this.fetch(`/proxy/api/v${version}${path}`, method, payload);
  }
}