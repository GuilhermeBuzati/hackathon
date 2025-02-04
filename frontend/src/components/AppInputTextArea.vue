<script lang="ts" setup>
import { useId, type TextareaHTMLAttributes } from "vue";

interface CustomProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  label?: string;
}

defineProps<CustomProps>();

const model = defineModel<string>({ required: true });

defineOptions({ inheritAttrs: false });

const id = "label-" + useId();
</script>

<template>
  <div class="app-input-container">
    <label
      v-if="label"
      class="label"
      :for="id">
      {{ label }}
    </label>
    <textarea
      ref="textarea"
      v-bind="$attrs"
      v-model="model"
      type="text"
      class="app-textarea"
      :id="id" />
  </div>
</template>

<style lang="scss" scoped>
.app-input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > .label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}

.app-textarea {
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid var(--color-light-4);
  outline: 1px solid transparent;
  outline-offset: 1px;
  transition: 0.3s ease;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  min-width: 120px;

  &:hover {
    border-color: var(--color-brand-3);
  }

  &:focus-within {
    border-color: var(--color-brand-3);
    outline-color: var(--color-brand-1);
  }
}
</style>
