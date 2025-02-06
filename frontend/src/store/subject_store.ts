import { useEventBus } from "@/event_bus";
import { useSubjectGateway } from "@/gateway/subject_gateway";
import type { SubjectModel } from "@/models/subject_model";
import { defineStore } from "pinia";
import { computed, reactive, toValue, type ComputedRef } from "vue";

type State = {
  entities: SubjectModel[];
  loading: boolean;
};

export const useSubjectStore = defineStore("subject-store", () => {
  const subjectGateway = useSubjectGateway();
  const bus = useEventBus();

  const state = reactive<State>({
    entities: [],
    loading: false,
  });

  const load = async (): Promise<void> => {
    state.loading = true;
    const result = await subjectGateway.getAll();
    if (result.isOk) {
      state.entities = result.data;
    }

    state.loading = false;
  };

  const create = async (description: string): Promise<void> => {
    const result = await subjectGateway.create(description);
    if (result.isOk) {
      state.entities.push(result.data);
    }
  };

  const getItem = (id: number): SubjectModel | null => {
    return toValue(state.entities.find(s => s.id === id) ?? null);
  };

  const selectById = (id: number): ComputedRef<SubjectModel | null> => {
    return computed(() => state.entities.find(s => s.id === id) ?? null);
  };

  const remove = async (id: number): Promise<string | null> => {
    const result = await subjectGateway.delete(id);
    if (result.isErr) {
      return result.error;
    }

    const index = state.entities.findIndex(s => s.id === id);
    if (index >= 0) {
      state.entities.splice(index, 1);
    }
    bus.send("questionRemove", { questionId: id });
    return null;
  };

  bus.on("topicRemove", ({ topicId }) => {
    for (const item of state.entities) {
      const indexTopic = item.topics.findIndex(s => s.id === topicId);
      if (indexTopic >= 0) {
        item.topics.splice(indexTopic, 1);
      }
    }
  });

  bus.on("topicInclude", ({ topic }) => {
    const index = state.entities.findIndex(s => s.id === topic.subject.id);
    if (index >= 0) {
      state.entities[index].topics.push(topic);
    }
  });

  return {
    data: computed(() => state.entities),
    isLoading: computed(() => state.loading),
    load,
    create,
    getItem,
    remove,
    selectById,
  };
});
