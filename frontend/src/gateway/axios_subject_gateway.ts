import type { Axios } from "axios";
import type {
  CreateResponse,
  GetAllResponse,
  GetByIdResponse,
  SubjectGateway,
} from "./subject_gateway";
import { ok } from "@/utils/result";

export class AxiosSubjectGateway implements SubjectGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllResponse> {
    return ok([
      { id: 1, description: "Português" },
      { id: 2, description: "Matemática" },
      { id: 3, description: "História" },
      { id: 4, description: "Filosofia" },
    ]);
  }

  async create(description: string): Promise<CreateResponse> {
    return ok({ id: 1, description });
  }

  async getById(id: number): Promise<GetByIdResponse> {
    return ok({ id, description: "Português" });
  }
}
