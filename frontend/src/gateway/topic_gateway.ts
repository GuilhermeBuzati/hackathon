import type { TopicModel } from "@/models/topic_model";
import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface TopicGateway {
  getAll(): Promise<GetAllOutput>;
  create(input: CreateInput): Promise<CreateOutput>;
  delete(id: number): Promise<Result<boolean>>;
}

export type GetByIdOutput = Result<TopicModel | null>;
export type GetAllOutput = Result<TopicModel[]>;

export type CreateInput = {
  description: string;
  subjectId: number;
  period: string;
};
export type CreateOutput = Result<TopicModel>;

const key = Symbol() as InjectionKey<TopicGateway>;

export function provideTopicGateway(app: App, value: TopicGateway): void {
  app.provide(key, value);
}

export function useTopicGateway(): TopicGateway {
  return inject(key)!;
}
