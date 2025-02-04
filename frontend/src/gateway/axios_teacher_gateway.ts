import type { Axios } from "axios";
import type {
  LoginParams,
  LoginResponse,
  SignInParams,
  SignInResponse,
  TeacherGateway,
} from "./teacher_gateway";
import { err, ok } from "@/utils/result";

export class AxiosTeacherGateway implements TeacherGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await this.#http.post("/professor/login", {
        email: params.email,
        senha: params.password,
      });

      return ok({ token: response.data.token });
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async signIn(params: SignInParams): Promise<SignInResponse> {
    try {
      const response = await this.#http.post("/professor", {
        nome: params.name,
        email: params.email,
        senha: params.password,
      });

      return ok({ token: response.data.token });
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }
}
