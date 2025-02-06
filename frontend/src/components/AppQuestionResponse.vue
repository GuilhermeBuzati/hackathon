<script setup lang="ts">
import type { QuestionModel } from "@/models/question_model";

defineProps<{ question: QuestionModel }>();

const model = defineModel<QuestionModel[]>();
</script>

<template>
  <label class="app-question-response">
    <input
      type="checkbox"
      class="app-checkbox"
      :value="question"
      v-model="model" />

    <span class="app-question-content">
      <p class="title">
        {{ question.description }}
      </p>
      <ul class="list">
        <li
          v-for="response of question.responses"
          :key="response">
          {{ response }}
        </li>
      </ul>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.app-question-response {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
}

.app-question-content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: 14px;
  line-height: 20px;

  & > .title {
    font-weight: 600;
  }

  & > .list {
    font-weight: 400;
    display: flex;
    flex-direction: column;
  }
}
</style>
