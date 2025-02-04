import type { Result } from "@/utils/result";
import { inject, type App, type InjectionKey } from "vue";

export interface TeacherGateway {
  login(params: LoginParams): Promise<LoginResponse>;
  signIn(params: SignInParams): Promise<SignInResponse>;
}

export type LoginParams = { email: string; password: string };
export type LoginResponse = Result<{ token: string }>;

export type SignInParams = {
  email: string;
  name: string;
  password: string;
};
export type SignInResponse = Result<{}>;

const key = Symbol() as InjectionKey<TeacherGateway>;

export function useTeacherGateway(): TeacherGateway {
  return inject(key)!;
}

export function provideTeacherGateway(app: App, value: TeacherGateway): void {
  app.provide(key, value);
}
