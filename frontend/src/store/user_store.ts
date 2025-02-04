import { useHttpConfig } from "@/gateway/http_config";
import { useTeacherGateway } from "@/gateway/teacher_gateway";
import type { UserModel } from "@/models/user_model";
import { defineStore } from "pinia";
import { readonly, ref } from "vue";

export const useUserStore = defineStore("user-store", () => {
  const teacherGateway = useTeacherGateway();
  const httpConfig = useHttpConfig();

  const state = ref<UserModel | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(email, password);

    const result = await teacherGateway.login({ email, password });
    if (result.isErr) {
      console.log(result.error);
      return false;
    }

    console.log(result.data);
    // httpConfig.addAuthorization(token);
    return true;
  };

  const signIn = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    console.log("JOVEM DE VALOR");
    console.log(email, password);

    const result = await teacherGateway.signIn({ name, email, password });
    if (result.isErr) {
      console.log(result.error);
      return false;
    }

    console.log(result.data);
    // httpConfig.addAuthorization(token);
    return true;
  };

  const logout = async (): Promise<void> => {
    httpConfig.removeAuthorization();
  };

  return { login, logout, signIn, user: readonly(state) };
});
