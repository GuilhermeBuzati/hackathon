<script lang="ts" setup>
import { useId, type InputHTMLAttributes } from "vue";
import AppIcon from "./AppIcon.vue";

interface CustomProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  iconStart?: IconName;
  iconEnd?: IconName;
  error?: string;
  hasErrors?: boolean;
  focusInput?: boolean;
}

const model = defineModel<string>();
defineOptions({ inheritAttrs: false });
defineProps<CustomProps>();
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
    <div class="app-input">
      <input
        v-bind="$attrs"
        v-model="model"
        class="native"
        :id="id"
        v-focus="focusInput" />

      <AppIcon
        v-if="iconStart"
        class="left"
        :name="iconStart" />

      <AppIcon
        v-if="iconEnd"
        class="right"
        :name="iconEnd" />

      <div
        v-if="$slots.iconStart && !iconStart"
        class="left">
        <slot name="iconStart" />
      </div>

      <div
        v-if="$slots.iconEnd && !iconEnd"
        class="right">
        <slot name="iconEnd" />
      </div>
    </div>

    <div
      class="error"
      v-if="hasErrors">
      <Transition name="fade-error">
        <p v-if="error">{{ error }}</p>
      </Transition>
    </div>
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

  & > .error {
    display: block;
    padding-left: 4px;
    height: 14px;
    font-size: 12px;
    color: var(--color-danger-3);
  }
}

.app-input {
  position: relative;

  & > .left {
    position: absolute;
    left: 16px;
    bottom: 50%;
    transform: translateY(50%);
    color: var(--color-dark-2);
    font-size: 16px;
  }

  & > .right {
    position: absolute;
    right: 16px;
    bottom: 50%;
    transform: translateY(50%);
    color: var(--color-dark-2);
    font-size: 16px;
  }

  & > .native {
    border-radius: 8px;
    padding: 8px 16px;
    border: 1px solid var(--color-light-4);
    outline: 1px solid transparent;
    outline-offset: 1px;
    transition: 0.3s ease;
    font-size: 16px;
    line-height: 24px;
    height: 40px;
    width: 100%;
    min-width: 120px;
  }

  &:has(.left) > .native {
    padding-left: 40px;
  }

  &:has(.right) > .native {
    padding-right: 40px;
  }

  & > .native:hover {
    border-color: var(--color-brand-3);
  }

  & > .native:focus-within {
    border-color: var(--color-brand-3);
    outline-color: var(--color-brand-1);
  }
}

.fade-error-enter-from {
  transform: translateY(-2px);
}

.fade-error-leave-to {
  transform: translateY(1px);
}

.fade-error-leave-to,
.fade-error-enter-from {
  opacity: 0;
}

.fade-error-enter-to,
.fade-error-leave-from {
  opacity: 1;
}

.fade-error-leave-active,
.fade-error-enter-active {
  transition: 0.2s ease;
}
</style>
