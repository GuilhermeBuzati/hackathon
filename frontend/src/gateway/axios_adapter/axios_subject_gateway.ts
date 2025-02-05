import type { Axios } from "axios";
import type {
  CreateResponse,
  GetAllResponse,
  GetByIdResponse,
  SubjectGateway,
} from "../subject_gateway";
import { err, ok } from "@/utils/result";
import { parseSubject } from "@/models/subject_model";

export class AxiosSubjectGateway implements SubjectGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllResponse> {
    try {
      const response = await this.#http.get("/materia");
      return ok(response.data.map(parseSubject));
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async create(description: string): Promise<CreateResponse> {
    try {
      const response = await this.#http.post("materia", {
        descricao: description,
      });

      return ok(parseSubject(response.data));
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async getById(id: number): Promise<GetByIdResponse> {
    try {
      const response = await this.#http.get(`materia/${id}`);
      return ok(response.data ? parseSubject(response.data) : null);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.#http.delete(`materia/${id}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}
