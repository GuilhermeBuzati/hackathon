import * as v from "valibot";

export const senhaSchema = v.pipe(
  v.string(),
  v.minLength(8, "senha deve ter no mínimo 8 caracteres"),
  v.regex(/[a-z]/, "senha deve conter letra minuscula"),
  v.regex(/[A-Z]/, "senha deve conter letra maiúscula"),
  v.regex(/[0-9]/, "senha deve ter um número"),
);

export const emailSchema = v.pipe(v.string(), v.email("email invalido"));

export const idSchema = v.pipe(v.number());
