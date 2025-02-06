import type { QuestionModel } from "@/models/question_model";
import { useQuestionGateway } from "@/gateway/question_gateway";
import { computed, reactive, toValue } from "vue";
import { defineStore } from "pinia";
import { useTeacherStore } from "./teacher_store";

type State = {
  loading: boolean;
  createLoading: boolean;
  entities: QuestionModel[];
};

export const useQuestionStore = defineStore("question-store", () => {
  const questionGateway = useQuestionGateway();

  const state = reactive<State>({
    loading: false,
    createLoading: false,
    entities: [],
  });

  const questions = computed(() => state.entities);

  const isLoading = computed(() => state.loading);

  const isEmpty = computed(() => questions.value.length === 0);

  const load = async (): Promise<void> => {
    if (state.loading) return;

    state.loading = true;
    const result = await questionGateway.getMany();
    if (result.isOk) {
      state.entities = result.data;
    }

    state.loading = false;
  };

  const getItem = (id: number): QuestionModel | null => {
    return toValue(state.entities.find(s => s.id === id) ?? null);
  };

  const create = async (
    description: string,
    topicId: number,
    responses: string[],
  ): Promise<string | null> => {
    const teacherStore = useTeacherStore();

    state.createLoading = true;
    const result = await questionGateway.create({
      description,
      responses,
      topicId,
      teacherId: teacherStore.user!.id,
    });
    state.createLoading = false;
    if (result.isErr) {
      return result.error;
    }

    state.entities.push(result.data);
    return null;
  };

  const remove = async (id: number): Promise<string | null> => {
    const result = await questionGateway.delete(id);
    if (result.isErr) {
      return result.error;
    }

    const index = state.entities.findIndex(s => s.id === id);
    if (index >= 0) {
      state.entities.splice(index, 1);
    }
    return null;
  };

  const reset = (): void => {
    if (state.loading) return;
    state.entities = [];
  };

  return {
    load,
    reset,
    getItem,
    create,
    remove,
    questions,
    isLoading,
    isEmpty,
  };
});
