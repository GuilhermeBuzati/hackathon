import { idSchema } from "@/utils/schemas";
import * as v from "valibot";

export type TestModel = {
  id: number;
  title: string;
  subjectId: number;
  topicId: number;
  responses: string[];
};

const testSchema = v.object({
  id: idSchema,
  titulo: v.string(),
  materiaId: idSchema,
  temaId: idSchema,
  perguntas: v.array(v.number()),
});

export type TestSchema = v.InferInput<typeof testSchema>;

export function parseTest(raw: TestSchema): TestModel {
  return {
    id: raw.id,
    responses: raw.perguntas.map(s => "" + s),
    subjectId: raw.materiaId,
    title: raw.titulo,
    topicId: raw.temaId,
  };
}
