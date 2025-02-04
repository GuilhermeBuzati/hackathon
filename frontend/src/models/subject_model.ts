import { idSchema } from "@/utils/schemas";
import * as v from "valibot";

export type SubjectModel = {
  id: number;
  description: string;
};

const subjectSchema = v.object({
  id: idSchema,
  descricao: v.string(),
});

export type SubjectSchema = v.InferInput<typeof subjectSchema>;

export function parseSubject(raw: SubjectSchema): SubjectModel {
  return {
    id: raw.id,
    description: raw.descricao,
  };
}
