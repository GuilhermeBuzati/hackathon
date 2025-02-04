<script lang="ts" setup>
import { useId, ref } from "vue";
import AppIcon from "./AppIcon.vue";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
} from "@floating-ui/vue";

interface CustomProps {
  label?: string;
  placeholder?: string;
  options: string[];
}

defineOptions({ inheritAttrs: false });
const props = defineProps<CustomProps>();

const selectRef = ref<HTMLButtonElement | null>(null);
const floatingRef = ref<HTMLDivElement | null>(null);

const { floatingStyles } = useFloating(selectRef, floatingRef, {
  whileElementsMounted: autoUpdate,
  transform: false,
  middleware: [
    flip(),
    offset(8),
    shift({ padding: 4 }),
    size({
      apply({ rects, elements, availableHeight }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
          maxHeight: `${Math.min(availableHeight, 280) - 8}px`,
        });
      },
    }),
  ],
});

const model = defineModel<string | null>();

const isOpen = ref(false);

const id = "select-" + useId();

function onToggle(): void {
  isOpen.value = !isOpen.value;
}

function onClose(event?: FocusEvent): void {
  if (event) {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (floatingRef.value?.contains(relatedTarget)) {
      return;
    }
  }

  isOpen.value = false;
}
function onTab(event: Event): void {
  if (isOpen.value) {
    event.preventDefault();
    onClose();
  }
}

function onPreview(): void {
  const index = props.options.findIndex(s => s === model.value);
  const nextIndex = index - 1;
  if (nextIndex >= 0) {
    model.value = props.options[nextIndex];
  }
}

function onNext(): void {
  const index = props.options.findIndex(s => s === model.value);
  const nextIndex = index + 1;
  if (nextIndex < props.options.length) {
    model.value = props.options[nextIndex];
  }
}

function onSelect(value: string): void {
  if (value !== model.value) {
    model.value = value;
    onClose();
    selectRef.value?.focus();
  }
}
</script>

<template>
  <div class="app-select-container">
    <label
      class="label"
      :for="id"
      v-if="label">
      {{ label }}
    </label>
    <div
      v-bind="$attrs"
      class="app-select"
      :id="id"
      ref="selectRef"
      tabindex="0"
      @click="onToggle()"
      @keydown.enter="onToggle()"
      @keydown.space="onToggle()"
      @keydown.esc="onClose()"
      @keydown.tab="onTab($event)"
      @keydown.up.prevent="onPreview()"
      @keydown.down.prevent="onNext()"
      @blur="onClose($event)">
      <span style="text-align: left">{{
        model || placeholder || "Selecione"
      }}</span>
      <AppIcon
        class="right"
        name="chevron-down" />
    </div>
    <Transition name="fade">
      <ul
        v-if="isOpen"
        ref="floatingRef"
        class="app-select-popup"
        :style="floatingStyles">
        <li
          v-for="item of options"
          class="item"
          :class="{ '-active': item === model }"
          :key="item"
          @click="onSelect(item)"
          tabindex="0">
          {{ item }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-select-container {
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

.app-select {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
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
  background: var(--color-light-1);

  &:hover {
    border-color: var(--color-brand-3);
  }

  &:focus-within {
    border-color: var(--color-brand-3);
    outline-color: var(--color-brand-1);
  }
}

.app-select-popup {
  padding: 12px 0;
  background: var(--color-light-1);
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-light-3);
  overflow-y: auto;
  z-index: 1000;

  & > .item {
    padding: 8px 16px;
    user-select: none;
    cursor: pointer;
  }

  & > .item:hover {
    background: var(--color-light-2);
  }

  & > .item.-active {
    background: color-mix(
      in srgb,
      var(--color-brand-1) 30%,
      var(--color-light-1) 70%
    );
  }
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-active,
.fade-enter-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>
