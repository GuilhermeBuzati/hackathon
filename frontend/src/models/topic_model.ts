import { idSchema } from "@/utils/schemas";
import * as v from "valibot";
import type { SubjectModel } from "./subject_model";

export type TopicModel = {
  id: number;
  description: string;
  period: string;
  subject: SubjectModel;
};

export const topicSchema = v.object({
  id: idSchema,
  descricao: v.string(),
  periodo: v.string(),
  materia: v.object({
    id: idSchema,
    descricao: v.string(),
  }),
});

export type TopicSchema = v.InferInput<typeof topicSchema>;

export function parseTopic(raw: TopicSchema): TopicModel {
  return {
    id: raw.id,
    description: raw.descricao,
    period: raw.periodo,
    subject: {
      id: raw.materia.id,
      description: raw.materia.descricao,
      topics: [],
    },
  };
}
