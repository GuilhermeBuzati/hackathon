import { AxiosHttpConfig } from "@/gateway/axios_http_config";
import { AxiosQuestionGateway } from "@/gateway/axios_question_gateway";
import { AxiosTeacherGateway } from "@/gateway/axios_teacher_gateway";
import { provideHttpConfig } from "@/gateway/http_config";
import { provideQuestionGateway } from "@/gateway/question_gateway";
import { provideTeacherGateway as provideTeacherGateway } from "@/gateway/teacher_gateway";
import axios from "axios";
import { type Plugin } from "vue";

export default <Plugin>{
  install(app) {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3002",
    });

    provideHttpConfig(app, new AxiosHttpConfig(axiosInstance));
    provideQuestionGateway(app, new AxiosQuestionGateway(axiosInstance));
    provideTeacherGateway(app, new AxiosTeacherGateway(axiosInstance));
  },
};
