import { inject, type App } from "vue";

export interface HttpConfig {
  addAuthorization(token: string): void;
  removeAuthorization(): void;
  getAuthorization(): string | null;
}

const key = Symbol();

export function useHttpConfig(): HttpConfig {
  return inject(key)!;
}

export function provideHttpConfig(app: App, config: HttpConfig): void {
  app.provide(key, config);
}
