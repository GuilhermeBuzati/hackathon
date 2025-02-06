import type { SubjectModel } from "@/models/subject_model";
import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface SubjectGateway {
  getAll(): Promise<GetAllResponse>;
  getById(id: number): Promise<GetByIdResponse>;
  create(description: string): Promise<CreateResponse>;
  delete(id: number): Promise<Result<boolean>>;
}

export type GetAllResponse = Result<SubjectModel[]>;
export type CreateResponse = Result<SubjectModel>;
export type GetByIdResponse = Result<SubjectModel | null>;

const key = Symbol() as InjectionKey<SubjectGateway>;

export function provideSubjectGateway(app: App, value: SubjectGateway): void {
  app.provide(key, value);
}

export function useSubjectGateway(): SubjectGateway {
  return inject(key)!;
}
