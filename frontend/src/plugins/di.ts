import type { Plugin } from "vue";
import axios from "axios";

import { provideHttpConfig } from "@/gateway/http_config";
import { provideQuestionGateway } from "@/gateway/question_gateway";
import { provideSubjectGateway } from "@/gateway/subject_gateway";
import { provideTeacherGateway } from "@/gateway/teacher_gateway";
import { provideTestGateway } from "@/gateway/test_gateway";

import {
  AxiosTeacherGateway,
  AxiosHttpConfig,
  AxiosQuestionGateway,
  AxiosSubjectGateway,
  AxiosTestGateway,
} from "@/gateway/axios_adapter";

export default <Plugin>{
  install(app) {
    const instance = axios.create({
      baseURL: "http://localhost:3002",
    });

    provideHttpConfig(app, new AxiosHttpConfig(instance));
    provideQuestionGateway(app, new AxiosQuestionGateway(instance));
    provideTeacherGateway(app, new AxiosTeacherGateway(instance));
    provideSubjectGateway(app, new AxiosSubjectGateway(instance));
    provideTestGateway(app, new AxiosTestGateway(instance));
  },
};
