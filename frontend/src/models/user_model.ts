import { idSchema } from "@/utils/schemas";
import * as v from "valibot";

export const userSchema = v.object({
  id: idSchema,
  nome: v.string(),
});

export type UserModel = v.InferOutput<typeof userSchema>;
