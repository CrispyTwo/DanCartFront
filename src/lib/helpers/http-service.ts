export class HttpService {
  protected async fetch(uri: string, method: string, payload: string): Promise<any> {
    const response = await fetch(`/api/${uri}`, {
      headers: { "Content-Type": "application/json" },
      method: method,
      ...(method !== "GET" && payload ? { body: payload } : {})
    });

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
}
