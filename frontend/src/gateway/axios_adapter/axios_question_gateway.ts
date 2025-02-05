import type { QuestionModel } from "@/models/question_model";
import { ok, type Result } from "@/utils/result";
import type {
  CreateQuestionParams,
  QuestionGateway,
} from "../question_gateway";
import type { Axios } from "axios";

export class AxiosQuestionGateway implements QuestionGateway {
  #http: Axios;

  constructor(instance: Axios) {
    this.#http = instance;
  }

  async create(params: CreateQuestionParams): Promise<null> {
    try {
      const response = await this.#http.post("pergunta", {
        descricao: params.description,
        temaId: params.subjectId,
        professorId: params.teacherId,
        respostas: params.responses,
      });

      console.log(response.data);
    } catch (e) {}

    return null;
  }

  async getMany(): Promise<Result<QuestionModel[]>> {
    return ok([]);
  }

  async getById(id: string): Promise<Result<QuestionModel | null>> {
    return ok(null);
  }
}
