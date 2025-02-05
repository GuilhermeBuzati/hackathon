import { idSchema } from "@/utils/schemas";
import * as v from "valibot";
import type { TopicModel } from "./topic_model";

export type SubjectModel = {
  id: number;
  description: string;
  topics: Omit<TopicModel, "subject">[];
};

export const subjectSchema = v.object({
  id: idSchema,
  descricao: v.string(),
  temaMateria: v.array(
    v.object({
      id: idSchema,
      descricao: v.string(),
      periodo: v.string(),
    }),
  ),
});

export type SubjectSchema = v.InferInput<typeof subjectSchema>;

export function parseSubject(raw: SubjectSchema): SubjectModel {
  return {
    id: raw.id,
    description: raw.descricao,
    topics: raw.temaMateria.map(item => {
      return {
        id: item.id,
        description: item.descricao,
        period: item.periodo,
      };
    }),
  };
}
