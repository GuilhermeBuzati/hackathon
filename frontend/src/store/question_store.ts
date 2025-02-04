import type { QuestionModel } from "@/models/question_model";
import { useQuestionGateway } from "@/gateway/question_gateway";
import { computed, reactive, toValue } from "vue";
import { defineStore } from "pinia";

type State = {
  loading: boolean;
  entities: QuestionModel[];
};

export const useQuestionStore = defineStore("question-store", () => {
  const questionGateway = useQuestionGateway();

  const state = reactive<State>({
    loading: false,
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

  const getItem = (id: string): QuestionModel | null => {
    return toValue(state.entities.find(s => s.id === id) ?? null);
  };

  const reset = (): void => {
    if (state.loading) return;
    state.entities = [];
  };

  return { load, reset, getItem, questions, isLoading, isEmpty };
});
