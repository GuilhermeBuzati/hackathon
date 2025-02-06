import { AxiosError, type Axios } from "axios";
import type {
  CreateResponse,
  GetAllResponse,
  GetByIdResponse,
  SubjectGateway,
} from "../subject_gateway";
import { err, ok, type Result } from "@/utils/result";
import { parseSubject } from "@/models/subject_model";

export class AxiosSubjectGateway implements SubjectGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllResponse> {
    try {
      const response = await this.#http.get("/materia");
      if (response.status === 204) {
        return ok([]);
      }

      return ok(response.data.map(parseSubject));
    } catch (e) {
      console.log("NOVO NOVO", e);
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
      console.log(e);
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
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }

  async delete(id: number): Promise<Result<boolean>> {
    try {
      await this.#http.delete(`materia/${id}`);
      return ok(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }
}
