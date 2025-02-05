<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import SubjectCreateModal from "@/components/SubjectCreateModal.vue";
import SubjectCreateTopic from "@/components/SubjectCreateTopic.vue";
import SubjectTopic from "@/components/SubjectTopic.vue";
import type { SubjectModel } from "@/models/subject_model";
import type { TopicModel } from "@/models/topic_model";
import { useTopicStore } from "@/store/topic_store";
import { ref } from "vue";

const topicStore = useTopicStore();

const props = defineProps<{ item: SubjectModel }>();

async function onRemove(topic: Omit<TopicModel, "subject">): Promise<void> {
  const error = await topicStore.delete(topic.id);
  if (error) {
    alert(error);
  }
}

async function onCreate(value: {
  description: string;
  period: string;
}): Promise<void> {
  const error = await topicStore.create(
    value.description,
    props.item.id,
    value.period,
  );
  if (error) {
    alert(error);
  }

  createModal.value = false;
}

const createModal = ref(false);
</script>

<template>
  <div class="subject-edit-view">
    <div class="subject-header">
      <RouterLink
        class="app-back-button _mb-3"
        to="/subject">
        <AppIcon name="chevron-left" /> Voltar
      </RouterLink>

      <div class="header">
        <h2 style="font-weight: bold; font-size: 32px">
          {{ item.description }}
        </h2>
        <button class="app-button -danger -icon">
          <AppIcon name="trash" />
        </button>
      </div>
    </div>

    <div
      class="topics"
      v-if="item.topics.length > 0">
      <SubjectTopic
        v-for="topic of item.topics"
        :key="topic.id"
        :topic="topic"
        @remove="onRemove(topic)" />

      <div style="display: flex; justify-content: center; margin-top: 8px">
        <button
          class="app-button -brand"
          @click="createModal = true">
          <AppIcon name="plus" />
          Adicionar tema
        </button>
      </div>
    </div>

    <div
      v-else
      style="
        margin-top: 160px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 16px;
      ">
      <p>Sem temas adicionados</p>
      <button
        class="app-button -brand"
        @click="createModal = true">
        <AppIcon name="plus" />
        Adicionar tema
      </button>
    </div>
    <SubjectCreateTopic
      v-model:is-open="createModal"
      @create="onCreate($event)" />
  </div>
</template>

<style lang="scss" scoped>
.subject-edit-view {
  max-width: 640px;
  padding-top: 60px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  & > .topics {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

.subject-header {
  & > .header {
    margin-bottom: 32px;
    align-items: center;
    gap: 8px;
    display: grid;
    grid-template-columns: 1fr auto;
  }
}

.subject-topic {
  border: 1px solid var(--color-light-3);
}
</style>
