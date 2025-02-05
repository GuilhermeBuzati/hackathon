import { AxiosError, type Axios } from "axios";
import type {
  CreateInput,
  CreateOutput,
  GetAllOutput,
  GetByIdOutput,
  TopicGateway,
} from "../topic_gateway";
import { err, ok, type Result } from "@/utils/result";
import { parseTopic } from "@/models/topic_model";

export class AxiosTopicGateway implements TopicGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllOutput> {
    try {
      const response = await this.#http.get("tema");
      if (response.status === 204) {
        return ok([]);
      }

      return ok(response.data.map(parseTopic));
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }

  async create(input: CreateInput): Promise<CreateOutput> {
    try {
      const response = await this.#http.post("tema", {
        descricao: input.description,
        materiaId: input.subjectId,
        periodo: input.period,
      });

      console.log(response);
      throw "";
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }

  async delete(id: number): Promise<Result<boolean>> {
    try {
      await this.#http.delete(`tema/${id}`);
      return ok(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }
}
