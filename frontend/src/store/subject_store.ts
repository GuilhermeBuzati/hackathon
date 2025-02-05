import { useSubjectGateway } from "@/gateway/subject_gateway";
import type { SubjectModel } from "@/models/subject_model";
import type { TopicModel } from "@/models/topic_model";
import { defineStore } from "pinia";
import { computed, readonly, ref, toValue, type ComputedRef } from "vue";

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

  const selectById = (id: number): ComputedRef<SubjectModel | null> => {
    return computed(() => data.value.find(s => s.id === id) ?? null);
  };

  const removeTopic = (topicId: number): void => {
    for (const item of data.value) {
      const indexTopic = item.topics.findIndex(s => s.id === topicId);
      if (indexTopic >= 0) {
        item.topics.splice(indexTopic, 1);
      }
    }
  };

  const addTopic = (topic: TopicModel): void => {
    const index = data.value.findIndex(s => s.id === topic.subject.id);
    console.log("JOVEJOVEJO");
    if (index >= 0) {
      data.value[index].topics.push(topic);
      console.log("OI LINDA");
    }
  };

  return {
    data: readonly(data) as unknown as SubjectModel[],
    isLoading: readonly(dataLoading),
    load,
    create,
    getItem,
    removeTopic,
    selectById,
    addTopic,
  };
});
