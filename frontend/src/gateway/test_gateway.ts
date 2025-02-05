import type { TestModel } from "@/models/test_model";
import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface TestGateway {
  getAll(): Promise<GetAllResult>;
  getById(id: number): Promise<GetByIdResult>;
}

export type GetAllResult = Result<TestModel[]>;
export type GetByIdResult = Result<TestModel | null>;

const key = Symbol() as InjectionKey<TestGateway>;

export function provideTestGateway(app: App, value: TestGateway): void {
  app.provide(key, value);
}

export function useTestGateway(): TestGateway {
  return inject(key)!;
}
