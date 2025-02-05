<script setup lang="ts">
import type { TopicModel } from "@/models/topic_model";
import AppIcon from "./AppIcon.vue";
import { ref } from "vue";
import AppConfirmationModal from "./AppConfirmationModal.vue";

defineProps<{ topic: Omit<TopicModel, "subject"> }>();

const emits = defineEmits<{
  remove: [];
  save: [value: Omit<TopicModel, "subject">];
}>();

const removeModal = ref(false);

function onRemove(): void {
  emits("remove");
  removeModal.value = false;
}
</script>

<template>
  <div class="subject-topic">
    <p class="_text-brand">
      {{ topic.description }} &nbsp;
      <span class="app-chip">{{ topic.period }}</span>
    </p>

    <button
      class="app-button -icon -small _text-brand"
      @click="removeModal = true">
      <AppIcon name="trash" />
    </button>

    <AppConfirmationModal
      @confirm="onRemove()"
      v-model:is-open="removeModal">
      <template #title> Exclusão! </template>

      <template #description>
        <p style="font-weight: bold; margin-bottom: 8px; text-align: center">
          Deseja remover o tema:
        </p>

        <p style="text-align: center">"{{ topic.description }}"</p>
      </template>
    </AppConfirmationModal>
  </div>
</template>

<style lang="scss" scoped>
.subject-topic {
  background: var(--color-light-2);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

dialog[open] {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  padding: 0;
  background: transparent;

  &::backdrop {
    background: #00000025;
    backdrop-filter: blur(4px);
  }
}

.app-create-modal {
  background: var(--color-light-1);
  width: 360px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #00000014;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  gap: 24px;

  & > .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
  }

  & > .actions {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>
