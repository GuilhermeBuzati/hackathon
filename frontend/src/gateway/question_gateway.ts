import type { QuestionModel, QuestionSchema } from "@/models/question_model";
import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface QuestionGateway {
  create(question: CreateQuestionParams): Promise<CreateOutput>;
  getMany(): Promise<Result<QuestionModel[]>>;
}

export type CreateQuestionParams = {
  description: string;
  topicId: number;
  teacherId: number;
  responses: string[];
};

export type CreateOutput = Result<QuestionModel>;

const key = Symbol() as InjectionKey<QuestionGateway>;

export function useQuestionGateway(): QuestionGateway {
  return inject(key)!;
}

export function provideQuestionGateway(app: App, value: QuestionGateway): void {
  app.provide(key, value);
}
