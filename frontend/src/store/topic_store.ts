import { useTopicGateway } from "@/gateway/topic_gateway";
import type { SubjectModel } from "@/models/subject_model";
import type { TopicModel } from "@/models/topic_model";
import { defineStore } from "pinia";
import {
  computed,
  readonly,
  ref,
  toValue,
  type ComputedRef,
  type Ref,
} from "vue";
import { useSubjectStore } from "./subject_store";

export const useTopicStore = defineStore("topic-store", () => {
  const gateway = useTopicGateway();

  const data = ref<TopicModel[]>([]);
  const dataLoading = ref(false);
  const createLoading = ref(false);

  const load = async (): Promise<void> => {
    dataLoading.value = true;
    const result = await gateway.getAll();
    if (result.isOk) {
      data.value = result.data;
    }

    dataLoading.value = false;
  };

  const create = async (
    description: string,
    subjectId: number,
    period: string,
  ): Promise<string | null> => {
    createLoading.value = true;
    const result = await gateway.create({ description, subjectId, period });
    createLoading.value = false;
    if (result.isErr) {
      return result.error;
    }

    console.log(result.data);
    data.value.push(result.data);
    const subjectStore = useSubjectStore();
    subjectStore.addTopic(result.data);
    return null;
  };

  const selectDataBySubject = (
    subject: Ref<SubjectModel | null>,
    showWhenSubjectIsEmpty: boolean = true,
  ): ComputedRef<TopicModel[]> => {
    return computed(() => {
      if (subject.value === null) {
        return showWhenSubjectIsEmpty ? data.value : [];
      }

      return data.value.filter(s => s.subject.id === subject.value!.id);
    });
  };

  const getItem = (id: number): TopicModel | null => {
    return toValue(data.value.find(s => s.id === id) ?? null);
  };

  const remove = async (id: number): Promise<string | null> => {
    const result = await gateway.delete(id);
    if (result.isErr) {
      return result.error;
    }

    const subjectStore = useSubjectStore();
    subjectStore.removeTopic(id);
    return null;
  };

  return {
    data: readonly(data),
    isLoading: readonly(dataLoading),
    load,
    create,
    selectDataBySubject,
    getItem,
    delete: remove,
  };
});
