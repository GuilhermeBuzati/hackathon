<script lang="ts" setup>
import type { QuestionModel } from "@/models/question_model";
import AppIcon from "./AppIcon.vue";
import { ref } from "vue";

defineProps<{ question: QuestionModel }>();

defineEmits<{
  removed: [];
}>();

const isOpen = ref(false);
</script>

<template>
  <div class="app-question-response-accordion">
    <span class="trigger">
      <button
        class="app-button -flat -small -icon"
        @click="isOpen = !isOpen">
        <AppIcon name="chevron-down" />
      </button>
      <span>{{ question.description }}</span>
      <button
        class="app-button -flat -small -icon"
        @click="$emit('removed')">
        <AppIcon name="x" />
      </button>
    </span>
    <ul
      class="list"
      v-if="isOpen">
      <li
        v-for="response of question.responses"
        :key="response">
        {{ response }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.app-question-response-accordion {
  box-shadow: 0 4px 8px #00000014;
  border-radius: 8px;
  background-color: var(--color-light-1);
  border: 1px solid var(--color-light-3);
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: column;

  & > .trigger {
    background: transparent;
    border: none;
    outline: none;
    display: grid;
    text-align: left;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
    padding: 16px;
    font-size: 14px;
    height: unset;
    cursor: pointer;
  }

  & > .list {
    list-style: square;
    background-color: var(--color-light-2);
    border-radius: 16px;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin: 0 16px 16px 16px;

    & > li {
      margin-left: 24px;
    }
  }
}
</style>
