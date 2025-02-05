import { useSubjectGateway } from "@/gateway/subject_gateway";
import type { SubjectModel } from "@/models/subject_model";
import { defineStore } from "pinia";
import { readonly, ref, toValue, type Ref } from "vue";

export const useSubjectStore = defineStore("subject-store", () => {
  const subjectGateway = useSubjectGateway();

  const data = ref<SubjectModel[]>([]);
  const dataLoading = ref(false);

  const load = async (): Promise<void> => {
    dataLoading.value = true;
    const result = await subjectGateway.getAll();
    if (result.isOk) {
      data.value = result.data;
    }

    dataLoading.value = false;
  };

  const create = async (description: string): Promise<void> => {
    const result = await subjectGateway.create(description);
    if (result.isOk) {
      data.value.push(result.data);
    }
  };

  const getItem = (id: number): SubjectModel | null => {
    return toValue(data.value.find(s => s.id === id) ?? null);
  };

  return {
    data: readonly(data) as unknown as SubjectModel[],
    isLoading: readonly(dataLoading),
    load,
    create,
    getItem,
  };
});
