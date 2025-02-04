import type { QuestionModel } from "@/models/question_model";
import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface QuestionGateway {
  create(question: CreateQuestionParams): Promise<null>;
  getMany(): Promise<Result<QuestionModel[]>>;
  getById(id: string): Promise<Result<QuestionModel | null>>;
}

export type CreateQuestionParams = {
  description: string;
  subjectId: number;
  teacherId: string;
  responses: string[];
};

const key = Symbol() as InjectionKey<QuestionGateway>;

export function useQuestionGateway(): QuestionGateway {
  return inject(key)!;
}

export function provideQuestionGateway(app: App, value: QuestionGateway): void {
  app.provide(key, value);
}
