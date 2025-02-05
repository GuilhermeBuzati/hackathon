<script lang="ts" setup generic="T extends Object">
import { useId, ref, watch, toValue } from "vue";
import AppIcon from "./AppIcon.vue";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
} from "@floating-ui/vue";
import { isEqual } from "lodash";

interface CustomProps {
  label?: string;
  placeholder?: string;
  options: T[];
  clear?: boolean;
  optionKey: keyof T;
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

const model = defineModel<T | null>();

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
  const index = props.options.findIndex(isActive);
  const nextIndex = index - 1;
  if (nextIndex >= 0) {
    model.value = props.options[nextIndex];
  }
}

function onNext(): void {
  const index = props.options.findIndex(isActive);
  const nextIndex = index + 1;
  if (nextIndex < props.options.length) {
    model.value = props.options[nextIndex];
  }
}

function onSelect(value: T): void {
  if (value !== model.value) {
    model.value = value;
    onClose();
    selectRef.value?.focus();
  }
}

watch(
  () => props.options,
  () => {
    const index = props.options.findIndex(isActive);
    if (index < 0) {
      model.value = null;
    }
  },
  { immediate: false },
);

function isActive(item: T): boolean {
  return (
    !!model.value && item[props.optionKey] === model.value[props.optionKey]
  );
}
</script>

<template>
  <div class="app-select-container">
    <div class="app-select-annotation">
      <label
        class="label"
        :for="id"
        v-if="label">
        {{ label }}
      </label>

      <button
        v-if="clear && model !== null"
        class="app-button -flat -brand -small"
        style="padding: 0; min-height: unset; font-size: 12px; min-width: unset"
        @click="model = null">
        Limpar
      </button>
    </div>
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
      <span style="text-align: left">
        <template v-if="model === null">
          {{ placeholder }}
        </template>

        <slot
          v-else-if="$slots.item"
          name="item"
          :value="model" />

        <template v-else>
          {{ model }}
        </template>
      </span>
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
          v-if="options.length === 0"
          class="empty">
          <AppIcon name="filter" />
          <span>Vazio</span>
        </li>

        <template v-else>
          <li
            v-for="item of options"
            class="item"
            :class="{ '-active': isActive(item) }"
            :key="item[optionKey] as any"
            @click="onSelect(item)"
            tabindex="0">
            <slot
              v-if="$slots.item"
              name="item"
              :value="item"></slot>

            <template v-else>
              {{ item }}
            </template>
          </li>
        </template>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-select-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app-select-annotation {
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  & > .empty {
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--color-dark-2);
    justify-content: center;
    padding: 8px 16px;
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
