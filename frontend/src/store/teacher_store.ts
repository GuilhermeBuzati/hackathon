import { useHttpConfig, type HttpConfig } from "@/gateway/http_config";
import { useTeacherGateway } from "@/gateway/teacher_gateway";
import type { TeacherModel } from "@/models/teacher_model";
import { defineStore } from "pinia";
import { readonly, ref, type Ref } from "vue";
import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isBefore } from "date-fns";

function getTeacherFromStorage(): TeacherModel | null {
  const data = localStorage.getItem("teacher:data");
  if (data === null) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function setup(data: Ref<TeacherModel | null>, config: HttpConfig): void {
  const token = localStorage.getItem("teacher:token");
  if (token === null) {
    return;
  }

  const expirationDate = fromUnixTime(jwtDecode(token).exp!);
  const today = new Date();
  const isInvalidToken = isBefore(expirationDate, today);
  if (isInvalidToken) {
    return;
  }

  data.value = getTeacherFromStorage();
  config.addAuthorization(token);
}

export const useTeacherStore = defineStore("teacher-store", () => {
  const teacherGateway = useTeacherGateway();
  const httpConfig = useHttpConfig();

  const data = ref<TeacherModel | null>(null);
  setup(data, httpConfig);

  const resetStateAndStorage = () => {
    localStorage.removeItem("teacher:token");
    localStorage.removeItem("teacher:data");
    data.value = null;
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    const result = await teacherGateway.login({ email, password });
    if (result.isErr) {
      resetStateAndStorage();
      return result.error;
    }

    data.value = {
      id: result.data.id,
      email: result.data.email,
      name: result.data.name,
    };

    httpConfig.addAuthorization(result.data.token);
    localStorage.setItem("teacher:token", result.data.token);
    localStorage.setItem("teacher:data", JSON.stringify(data.value));
    return null;
  };

  const signIn = async (
    name: string,
    email: string,
    password: string,
  ): Promise<string | null> => {
    const result = await teacherGateway.signIn({ name, email, password });
    console.log("SIGNIN RESULT", result);
    if (result.isErr) {
      resetStateAndStorage();
      return result.error;
    }

    data.value = {
      id: result.data.id,
      email: result.data.email,
      name: result.data.name,
    };

    console.log("OI OI OI");
    httpConfig.addAuthorization(result.data.token);
    localStorage.setItem("teacher:token", result.data.token);
    localStorage.setItem("teacher:data", JSON.stringify(data.value));
    return null;
  };

  const logout = async (): Promise<void> => {
    resetStateAndStorage();
    httpConfig.removeAuthorization();
  };

  return { login, logout, signIn, user: readonly(data) };
});
