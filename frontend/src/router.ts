import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import { useQuestionStore } from "@/store/question_store";
import { useSubjectStore } from "./store/subject_store";
import { useTeacherStore } from "./store/teacher_store";
import { useTestStore } from "./store/test_store";
import { useTopicStore } from "./store/topic_store";

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

        const questionStore = useQuestionStore();
        const subjectStore = useSubjectStore();
        const testStore = useTestStore();
        const topicStore = useTopicStore();

        await Promise.all([
          questionStore.load(),
          subjectStore.load(),
          testStore.load(),
          topicStore.load(),
        ]);

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
          props: route => ({ item: route.meta.item }),
          component: () => import("@/views/QuestionEditView.vue"),
          beforeEnter: async (to, _, next) => {
            const id = parseInt(to.params.id as string);
            const questionStore = useQuestionStore();
            const item = questionStore.getItem(id);
            if (item !== null) {
              to.meta.item = item;
              return next();
            }

            return next("/question/new");
          },
        },
        {
          path: "test",
          name: "test",
          component: () => import("@/views/TestView.vue"),
        },
        {
          path: "test/print/:id",
          name: "test-print",
          component: () => import("@/views/TestPrintView.vue"),
          beforeEnter: async (to, _, next) => {
            const id = parseInt(to.params.id as string);
            const subjectStore = useTestStore();
            return subjectStore.getItem(id) === null ? next("/test") : next();
          },
        },
        {
          path: "test/new",
          name: "test-new",
          component: () => import("@/views/TestEditView.vue"),
        },
        {
          path: "test/:id",
          name: "test-edit",
          component: () => import("@/views/TestEditView.vue"),
          beforeEnter: async (to, _, next) => {
            const id = parseInt(to.params.id as string);
            const subjectStore = useTestStore();
            return subjectStore.getItem(id) === null ? next("/test") : next();
          },
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
            return subjectStore.getItem(id) === null
              ? next("/subject")
              : next();
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
