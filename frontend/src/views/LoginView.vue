<script setup lang="ts">
import AppInputText from "@/components/AppInputText.vue";
import * as v from "valibot";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/valibot";
import { emailSchema, senhaSchema } from "@/utils/schemas";
import { useTeacherStore } from "@/store/teacher_store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useTeacherStore();

const loginSchema = v.object({
  email: emailSchema,
  password: senhaSchema,
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: "email@email.com",
    password: "Heli@123",
  },
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const loading = ref(false);

const onSubmit = handleSubmit(async data => {
  loading.value = true;
  const error = await userStore.login(data.email, data.password);
  if (error) {
    alert(error);
    return;
  }

  router.push("/");
  loading.value = false;
});
</script>

<template>
  <div class="login-view">
    <h2 class="title">Faça o Login</h2>

    <form
      class="form"
      novalidate
      @submit="onSubmit">
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
          Entrar
        </button>

        <RouterLink
          to="/auth/signin"
          style="
            font-weight: bold;
            display: block;
            width: 100%;
            text-align: center;
          "
          class="_text-brand">
          Cadastrar
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
