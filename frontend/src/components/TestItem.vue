<script setup lang="ts">
import type { TestModel } from "@/models/test_model";
import AppIcon from "./AppIcon.vue";
import { ref } from "vue";
import AppConfirmationModal from "./AppConfirmationModal.vue";

type Emits = {
  remove: [];
  edit: [];
  print: [];
};

defineProps<{ test: TestModel }>();
const emit = defineEmits<Emits>();

const modalOpen = ref(false);
</script>

<template>
  <div class="test-item">
    <div class="content">
      <h3
        class="_text-brand"
        style="font-size: 16px; font-weight: bold">
        {{ test.title }}
      </h3>
      <div
        style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
        <p style="color: var(--color-dark-2); font-size: 12px">
          {{ test.questions.length }} perguntas
        </p>
      </div>
    </div>
    <div class="actions">
      <button
        class="app-button -small -flat -brand -icon"
        @click="modalOpen = true">
        <AppIcon name="trash-2" />
      </button>

      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('edit')">
        <AppIcon name="edit" />
      </button>

      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('print')">
        <AppIcon name="file-text" />
      </button>
    </div>
    <AppConfirmationModal
      v-model:is-open="modalOpen"
      @confirm="emit('remove')">
      <template #title> Exclusão! </template>

      <template #description>
        <p style="font-weight: bold; text-align: center">
          Deseja removar a prova
        </p>
        <p style="text-align: center">"{{ test.title }}"</p>
      </template>
    </AppConfirmationModal>
  </div>
</template>

<style lang="scss" scoped>
.test-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 16px 0;

  & > .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & > .actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
