import { useTestGateway } from "@/gateway/test_gateway";
import type { TestModel } from "@/models/test_model";
import { defineStore } from "pinia";
import { computed, reactive, toValue } from "vue";

type State = {
  entities: TestModel[];
  loading: boolean;
};

export const useTestStore = defineStore("test-store", () => {
  const testGateway = useTestGateway();

  const state = reactive<State>({
    entities: [],
    loading: false,
  });

  const load = async (): Promise<void> => {
    state.loading = true;
    const result = await testGateway.getAll();
    if (result.isOk) {
      state.entities = result.data;
    }

    state.loading = false;
  };

  const isEmpty = computed(() => state.entities.length === 0);

  const getItem = (id: number): TestModel | null => {
    return toValue(state.entities.find(s => s.id === id) ?? null);
  };

  const create = async (
    title: string,
    questionIds: number[],
    subjectId: number,
  ): Promise<string | null> => {
    const result = await testGateway.create({ title, questionIds, subjectId });
    if (result.isErr) {
      return result.error;
    }

    state.entities.push(result.data);
    return null;
  };

  const update = async (
    id: number,
    title: string,
    questionIds: number[],
    subjectId: number,
  ): Promise<string | null> => {
    const result = await testGateway.update({
      id,
      title,
      questionIds,
      subjectId,
    });
    if (result.isErr) {
      return result.error;
    }

    const index = state.entities.findIndex(s => s.id === id);
    if (index >= 0) {
      state.entities[index] = result.data;
    }
    return null;
  };

  const remove = async (id: number): Promise<string | null> => {
    const result = await testGateway.delete(id);
    if (result.isErr) {
      return result.error;
    }

    const index = state.entities.findIndex(s => s.id === id);
    if (index >= 0) {
      state.entities.splice(index, 1);
    }
    return null;
  };

  return {
    data: computed(() => state.entities),
    isLoading: computed(() => state.loading),
    isEmpty,
    load,
    getItem,
    create,
    remove,
    update,
  };
});
