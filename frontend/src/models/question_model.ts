import * as v from "valibot";
import { idSchema } from "@/utils/schemas";
import {
  parseTeacher,
  teacherSchema,
  type TeacherModel,
} from "./teacher_model";
import { parseTopic, topicSchema, type TopicModel } from "./topic_model";

export type QuestionModel = {
  id: number;
  description: string;
  teacher: TeacherModel | null;
  topic: TopicModel;
  responses: string[];
};

export const questionSchema = v.object({
  id: idSchema,
  descricao: v.string(),
  periodo: v.string(),
  professor: v.optional(teacherSchema),
  tema: topicSchema,
  respostas: v.array(v.string()),
});

export type QuestionSchema = v.InferOutput<typeof questionSchema>;

export function parseQuestion(raw: QuestionSchema): QuestionModel {
  return {
    id: raw.id,
    description: raw.descricao,
    responses: raw.respostas,
    teacher: raw.professor ? parseTeacher(raw.professor) : null,
    topic: parseTopic(raw.tema),
  };
}
