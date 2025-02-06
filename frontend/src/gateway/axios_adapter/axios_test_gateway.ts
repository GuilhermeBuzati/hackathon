import { AxiosError, type Axios } from "axios";

import { err, ok, type Result } from "@/utils/result";
import type {
  CreateInput,
  GetAllResult,
  TestGateway,
  UpdateInput,
} from "../test_gateway";
import { parseTest, type TestModel } from "@/models/test_model";

export class AxiosTestGateway implements TestGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllResult> {
    try {
      const response = await this.#http.get("/prova");
      if (response.status === 204) {
        return ok([]);
      }

      const data = response.data.map(parseTest);
      return ok(data);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async create(input: CreateInput): Promise<Result<TestModel>> {
    try {
      const response = await this.#http.post("/prova", {
        materiaId: input.subjectId,
        perguntas: input.questionIds,
        titulo: input.title,
      });

      return ok(parseTest(response.data));
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }

  async delete(id: number): Promise<Result<boolean>> {
    try {
      await this.#http.delete(`prova/${id}`);
      return ok(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }

  async update(input: UpdateInput): Promise<Result<TestModel>> {
    try {
      const result = await this.#http.patch("prova", {
        titulo: input.title,
        materiaId: input.subjectId,
        perguntas: input.questionIds,
        id: input.id,
      });

      return ok(parseTest(result.data));
    } catch (e) {
      if (e instanceof AxiosError) {
        return err(e.response?.data.message ?? "");
      }

      return err(`${e}`);
    }
  }
}
