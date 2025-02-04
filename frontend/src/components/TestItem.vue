<script setup lang="ts">
import AppIcon from "./AppIcon.vue";

type Emits = {
  trash: [id: string];
  copy: [id: string];
  edit: [id: string];
  print: [id: string];
};

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="test-item">
    <div class="content">
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <span class="app-chip">9º Ano</span>
        <span class="app-chip">Matemática</span>
      </div>
      <h3
        class="_text-brand"
        style="font-size: 16px; font-weight: bold">
        Economia Avançada 1
      </h3>
      <p style="color: var(--color-dark-2); font-size: 12px">
        8 perguntas • Criado por Arlindo Pontes • 12/01/2024
      </p>
    </div>
    <div class="actions">
      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('trash', '1')">
        <AppIcon name="trash-2" />
      </button>

      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('copy', '1')">
        <AppIcon name="copy" />
      </button>

      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('edit', '1')">
        <AppIcon name="edit" />
      </button>

      <button
        class="app-button -small -flat -brand -icon"
        @click="emit('print', '1')">
        <AppIcon name="file-text" />
      </button>
    </div>
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
