/**
 * This service is responsible for making HTTP requests to the server.
 * It uses the Fetch API to make requests.
 * The service is initialized with a base URL, which is the URL of the server.
 * The service has methods for making GET, POST, PATCH, and DELETE requests.
 * The methods return a promise that resolves to the response from the server.
 * The response is parsed as JSON and returned.
 */

import { APPLICATION } from "../constants/application";

export class HttpService {

  constructor(private readonly _baseUrl: string = APPLICATION.API_URL) {}

  private get defaultHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  private async _fetch(method: string, endpoint: string, data?: unknown) {
    const response = await fetch(this._baseUrl + endpoint, {
      method,
      headers: this.defaultHeaders,
      credentials: "include",
      body: JSON.stringify(data),
    });
    return this.hanldedResponse(response);
  }

  private async hanldedResponse(response: Response) {
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }

  public get(endpoint: string) {
    return this._fetch("GET", endpoint);
  }

  public post(endpoint: string, data?: unknown) {
    return this._fetch("POST", endpoint, data);
  }

  public patch(endpoint: string, data: unknown) {
    return this._fetch("PATCH", endpoint, data);
  }

  public delete(endpoint: string) {
    return this._fetch("DELETE", endpoint);
  }
}
