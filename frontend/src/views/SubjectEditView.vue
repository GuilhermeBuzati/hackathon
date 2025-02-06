<script lang="ts" setup>
import AppConfirmationModal from "@/components/AppConfirmationModal.vue";
import AppIcon from "@/components/AppIcon.vue";
import SubjectCreateModal from "@/components/SubjectCreateModal.vue";
import SubjectCreateTopic from "@/components/SubjectCreateTopic.vue";
import SubjectTopic from "@/components/SubjectTopic.vue";
import type { SubjectModel } from "@/models/subject_model";
import type { TopicModel } from "@/models/topic_model";
import { useSubjectStore } from "@/store/subject_store";
import { useTopicStore } from "@/store/topic_store";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const topicStore = useTopicStore();
const subjectStore = useSubjectStore();

const route = useRoute();
const router = useRouter();

const subject = subjectStore.selectById(Number(route.params.id));

const createModal = ref(false);
const deleteModal = ref(false);

async function onRemoveTopic(
  topic: Omit<TopicModel, "subject">,
): Promise<void> {
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
    subject.value!.id,
    value.period,
  );
  if (error) {
    alert(error);
  }

  createModal.value = false;
}

async function onRemoveSubject(): Promise<void> {
  const error = await subjectStore.remove(subject.value!.id);
  if (error) {
    alert(error);
    deleteModal.value = false;
    return;
  }

  router.push("/subject");
  deleteModal.value = false;
}
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
          {{ subject!.description }}
        </h2>
        <button
          class="app-button -danger -icon"
          @click="deleteModal = true">
          <AppIcon name="trash" />
        </button>
      </div>
    </div>

    <div
      class="topics"
      v-if="subject!.topics?.length > 0">
      <div style="display: flex; flex-direction: column; gap: 4px">
        <SubjectTopic
          v-for="topic of subject!.topics"
          :key="topic.id"
          :topic="topic"
          @remove="onRemoveTopic(topic)" />
      </div>

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

    <AppConfirmationModal
      v-model:is-open="deleteModal"
      @confirm="onRemoveSubject()">
      <template #title> Exclusão! </template>

      <template #description>
        Deseja remover a matéria "{{ subject!.description }}"?
      </template>
    </AppConfirmationModal>
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
</style>
