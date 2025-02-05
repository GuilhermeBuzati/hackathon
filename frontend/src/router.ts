import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import { useQuestionStore } from "@/store/question_store";
import { useQuestionGateway } from "@/gateway/question_gateway";
import { useSubjectStore } from "./store/subject_store";
import { useSubjectGateway } from "./gateway/subject_gateway";
import { useTeacherStore } from "./store/teacher_store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainLayout,
      beforeEnter: async (to, from, next) => {
        const store = useTeacherStore();
        if (store.user === null) {
          return next("/auth/login");
        }

        return next();
      },
      children: [
        {
          path: "",
          redirect: "/question",
        },
        {
          path: "question",
          name: "question",
          component: () => import("@/views/QuestionView.vue"),
        },
        {
          path: "question/new",
          name: "question-new",
          component: () => import("@/views/QuestionEditView.vue"),
        },
        {
          path: "question/:id",
          name: "question-edit",
          component: () => import("@/views/QuestionEditView.vue"),
          beforeEnter: async (to, _, next) => {
            const id = to.params.id as string;
            const questionStore = useQuestionStore();
            const item = questionStore.getItem(id);
            if (item !== null) {
              to.meta.item = item;
              return next();
            }

            const questionGateway = useQuestionGateway();
            const result = await questionGateway.getById(id);
            if (result.isErr || result.data === null) {
              return next("/questions/new");
            }

            to.meta.item = result.data;
            return next();
          },
        },
        {
          path: "test",
          name: "test",
          component: () => import("@/views/TestView.vue"),
        },
        {
          path: "test/new",
          name: "test-new",
          component: () => import("@/views/TestEditView.vue"),
        },
        {
          path: "test/print",
          name: "test-print",
          component: () => import("@/views/TestPrintView.vue"),
        },
        {
          path: "test/:id",
          name: "test-edit",
          component: () => import("@/views/TestEditView.vue"),
        },
        {
          path: "subject",
          name: "subject",
          component: () => import("@/views/SubjectView.vue"),
        },
        {
          path: "subject/:id",
          name: "subject-edit",
          component: () => import("@/views/SubjectEditView.vue"),
          beforeEnter: async (to, _, next) => {
            const id = parseInt(to.params.id as string);
            const subjectStore = useSubjectStore();
            const item = subjectStore.getItem(id);
            if (item !== null) {
              to.meta.item = item;
              return next();
            }

            const subjectGateway = useSubjectGateway();
            const result = await subjectGateway.getById(id);
            if (result.isErr || result.data === null) {
              return next("/subject");
            }

            to.meta.item = result.data;
            return next();
          },
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/LoginView.vue"),
        },
        {
          path: "signIn",
          name: "signIn",
          component: () => import("@/views/SignInView.vue"),
        },
      ],
    },
  ],
});

export default router;
