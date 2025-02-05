import {
  parseQuestion,
  type QuestionModel,
  type QuestionSchema,
} from "@/models/question_model";
import { err, ok, type Result } from "@/utils/result";
import type {
  CreateOutput,
  CreateQuestionParams,
  QuestionGateway,
} from "../question_gateway";
import type { Axios } from "axios";

export class AxiosQuestionGateway implements QuestionGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async create(params: CreateQuestionParams): Promise<CreateOutput> {
    try {
      const response = await this.#http.post("pergunta", {
        descricao: params.description,
        temaId: params.topicId,
        professorId: params.teacherId,
        respostas: params.responses,
      });

      console.log(response.data);
      throw "";
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }

  async getMany(): Promise<Result<QuestionModel[]>> {
    try {
      const response = await this.#http.get("pergunta");
      if (response.status === 204) {
        return ok([]);
      }

      return ok(response.data.map(parseQuestion));
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(`${e}`);
    }
  }
}
