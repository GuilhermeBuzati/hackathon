<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import { ref } from "vue";
import type { QuestionSchema } from "@/models/question_model";

const questions = ref<QuestionSchema[]>([]);

const title = ref("");

const subject = ref("");
</script>

<template>
  <div class="question-edit-view">
    <RouterLink
      class="app-back-button _mb-3"
      to="/tests">
      <AppIcon name="chevron-left" /> Voltar
    </RouterLink>

    <div class="header">
      <h2 style="font-weight: bold; font-size: 32px">Nova Prova</h2>
    </div>

    <div class="grid">
      <div style="display: flex; flex-direction: column; gap: 24px">
        <AppInputText v-model="title" />

        <AppSelect
          v-model="subject"
          option-key="id"
          label="Matéria"
          :options="[]" />

        <AppSelect
          v-model="subject"
          option-key="id"
          label="Tema (opcional)"
          :options="[]" />
      </div>

      <div>
        <h4 style="font-weight: bold; margin-bottom: 4px; line-height: 24px">
          Cadastrar Perguntas
        </h4>
        <button class="app-button -flat -small -brand">
          <AppIcon name="plus" />
          Adicionar Pergunta
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-edit-view {
  max-width: 860px;
  padding-top: 60px;
  margin: 0 auto;

  & > .header {
    margin-bottom: 32px;
  }

  & > .grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 64px;
  }
}

.btn-handle {
  background-color: transparent;
  width: 16px;
  height: 16px;
  outline: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  cursor: grab;
}

.btn-remove {
  background-color: transparent;
  width: 16px;
  height: 16px;
  outline: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.drag-ghost {
  opacity: 1;
  box-shadow: 0 2px 4px #00000014;
  border-radius: 8px;
}

.drag-preview {
  opacity: 0;
}
</style>
