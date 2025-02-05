<script setup lang="ts">
import AppInputText from "@/components/AppInputText.vue";
import * as v from "valibot";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/valibot";
import { emailSchema, senhaSchema } from "@/utils/schemas";
import { useTeacherStore } from "@/store/teacher_store";

const userStore = useTeacherStore();

const signInSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("nome não pode ser vazio")),
    email: emailSchema,
    password: senhaSchema,
    passwordConfirm: senhaSchema,
  }),
  v.forward(
    v.check(
      state => state.password === state.passwordConfirm,
      "senhas não são iguais",
    ),
    ["passwordConfirm"],
  ),
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(signInSchema),
  initialValues: {
    name: "herisvelton",
    email: "email@email.com",
    password: "Heli@123",
    passwordConfirm: "Heli@123",
  },
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("passwordConfirm");

const onSubmit = handleSubmit(async data => {
  await userStore.signIn(data.name, data.email, data.password);
});
</script>

<template>
  <div class="login-view">
    <h2 class="title">Cadastre-se</h2>

    <form
      @submit="onSubmit"
      class="form">
      <AppInputText
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        label="Nome"
        has-errors
        :error="errors.name" />

      <AppInputText
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        label="Email"
        has-errors
        :error="errors.email" />

      <AppInputText
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        label="Senha"
        has-errors
        :error="errors.password" />

      <AppInputText
        v-model="passwordConfirm"
        v-bind="passwordConfirmAttrs"
        type="password"
        label="Confirmar senha"
        has-errors
        :error="errors.passwordConfirm" />

      <div
        style="
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        ">
        <button
          class="app-button -brand"
          style="width: 100%"
          type="submit">
          Cadastrar
        </button>

        <RouterLink
          to="/auth/login"
          style="
            font-weight: bold;
            display: block;
            width: 100%;
            text-align: center;
          "
          class="_text-brand">
          Voltar
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 360px;
  margin: 0 auto;
  padding: 60px 16px 16px 16px;

  & > .title {
    font-size: 32px;
    font-weight: bold;
    position: relative;
    align-self: flex-start;

    &::after {
      position: absolute;
      display: block;
      left: calc(100% + 4px);
      bottom: 4px;
      content: "";
      width: 24px;
      height: 4px;
      border-radius: 8px;
      background-color: var(--color-brand-3);
    }
  }

  & > .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
}

.input-border-bottom {
  margin-bottom: 32px;
}
</style>
