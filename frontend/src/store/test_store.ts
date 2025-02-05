import { useTestGateway } from "@/gateway/test_gateway";
import type { TestModel } from "@/models/test_model";
import { defineStore } from "pinia";
import { computed, readonly, ref, toValue } from "vue";

export const useTestStore = defineStore("test-store", () => {
  const testGateway = useTestGateway();

  const data = ref<TestModel[]>([]);
  const dataLoading = ref(false);

  const load = async (): Promise<void> => {
    dataLoading.value = true;
    const result = await testGateway.getAll();
    if (result.isOk) {
      data.value = result.data;
    }

    dataLoading.value = false;
  };

  const isEmpty = computed(() => data.value.length === 0);

  const getItem = (id: number): TestModel | null => {
    return toValue(data.value.find(s => s.id === id) ?? null);
  };

  return {
    data: readonly(data),
    isLoading: readonly(dataLoading),
    isEmpty,
    load,
    getItem,
  };
});
