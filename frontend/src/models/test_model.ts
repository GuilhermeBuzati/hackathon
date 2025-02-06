import { idSchema } from "@/utils/schemas";
import * as v from "valibot";

type TestQuestionModel = {
  id: number;
  description: string;
  responses: string[];
};

type TestSubjectModel = {
  id: number;
  description: string;
};

export type TestModel = {
  id: number;
  title: string;
  subject: TestSubjectModel;
  questions: TestQuestionModel[];
};

const testSchema = v.object({
  id: idSchema,
  titulo: v.string(),
  materia: v.object({
    id: idSchema,
    descricao: v.string(),
  }),
  perguntas: v.array(
    v.object({
      id: idSchema,
      descricao: v.string(),
      respostas: v.array(v.string()),
    }),
  ),
});

export type TestSchema = v.InferInput<typeof testSchema>;

export function parseTest(raw: TestSchema): TestModel {
  return {
    id: raw.id,
    subject: {
      id: raw.materia.id,
      description: raw.materia.descricao,
    },
    title: raw.titulo,
    questions: raw.perguntas.map(item => {
      return {
        id: item.id,
        description: item.descricao,
        responses: item.respostas,
        teacher: null,
        topic: null as any,
      };
    }),
  };
}
