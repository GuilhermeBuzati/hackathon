import * as v from "valibot";
import { userSchema } from "./user_model";
import { idSchema } from "@/utils/schemas";

export const questionSchema = v.object({
  id: idSchema,
  descricao: v.string(),
  periodo: v.string(),
  professor: v.optional(userSchema),
  tema: v.string(),
  respostas: v.array(v.string()),
});

export type QuestionModel = v.InferOutput<typeof questionSchema>;
