import { emailSchema, idSchema } from "@/utils/schemas";
import * as v from "valibot";

export type TeacherModel = {
  id: number;
  name: string;
  email: string;
};

export const teacherSchema = v.object({
  id: idSchema,
  nome: v.string(),
  email: emailSchema,
});

export type TeacherSchema = v.InferInput<typeof teacherSchema>;

export function parseTeacher(raw: TeacherSchema): TeacherModel {
  return {
    id: raw.id,
    name: raw.nome,
    email: raw.email,
  };
}
