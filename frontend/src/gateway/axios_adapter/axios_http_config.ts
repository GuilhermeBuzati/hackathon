import type { AxiosInstance } from "axios";
import type { HttpConfig } from "../http_config";

export class AxiosHttpConfig implements HttpConfig {
  #instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.#instance = instance;
    const value = localStorage.getItem("app:token");
    if (value) {
      this.#instance.defaults.headers["Authorization"] = `Bearer ${value}`;
    }
  }

  getAuthorization(): string | null {
    if (!this.#instance.defaults.headers) {
      return null;
    }

    return `${this.#instance.defaults.headers["Authorization"]}`;
  }

  addAuthorization(token: string): void {
    localStorage.setItem("app:token", token);
    this.#instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  removeAuthorization(): void {
    localStorage.removeItem("app:token");
    delete this.#instance.defaults.headers["Authorization"];
  }
}
