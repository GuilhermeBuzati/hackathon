<script setup lang="ts">
import type { QuestionModel } from "@/models/question_model";

defineProps<{ item: QuestionModel }>();
</script>

<template>
  <div class="question-card">
    <h3 class="title">{{ item.descricao }}</h3>
    <ul class="annotations">
      <li>{{ item.periodo }}</li>
      <li>{{ item.tema }}</li>
      <li>
        Criado por
        <strong style="font-weight: bold">
          {{ item.professor?.nome ?? "Não identificado" }}
        </strong>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.question-card {
  text-decoration: none;
  box-shadow: 0 2px 4px #00000014;
  border: 1px solid var(--color-light-2);
  min-height: 200px;
  padding: 24px;
  border-radius: 8px;
  transition: 0.2s ease;
  cursor: pointer;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 8px;
  height: 100%;

  & > .title {
    text-decoration: none;
    color: var(--color-brand-3);
    font-weight: 500;
    line-height: 24px;
  }

  & > .annotations {
    text-decoration: none;
    color: var(--color-dark-2);
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &:hover {
    transform: translateY(-4px);
    background: color-mix(
      in srgb,
      var(--color-brand-3) 10%,
      var(--color-light-1) 90%
    );
    border-color: color-mix(
      in srgb,
      var(--color-brand-3) 20%,
      var(--color-light-1) 80%
    );
  }
}
</style>
