import type { Axios } from "axios";

import { err, ok } from "@/utils/result";
import type { GetAllResult, GetByIdResult, TestGateway } from "../test_gateway";
import { parseTest } from "@/models/test_model";

export class AxiosTestGateway implements TestGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async getAll(): Promise<GetAllResult> {
    try {
      const response = await this.#http.get("/prova");

      const data = response.data.map(parseTest);
      return ok(data);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async getById(id: number): Promise<GetByIdResult> {
    return ok({
      id,
      responses: [],
      subjectId: 1,
      title: "Olá Marilene",
      topicId: 123,
    });
  }
}
