<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const isOpen = defineModel("is-open", { default: false });

const dialogRef = ref<HTMLDialogElement | null>(null);

watch(isOpen, () => handleModal());

onMounted(() => handleModal());

function handleModal(): void {
  console.log("OI OI OI");
  if (isOpen.value) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
  }
}
</script>

<template>
  <dialog
    ref="dialogRef"
    @close="isOpen = false"
    @click="isOpen = false">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="app-confirmation-modal">
        <h1
          class="title"
          v-if="$slots.title">
          <slot name="title" />
        </h1>

        <div
          class="description"
          v-if="$slots.description">
          <slot name="description" />
        </div>

        <div class="actions">
          <button
            class="app-button"
            @click="isOpen = false">
            Cancelar
          </button>
          <button class="app-button -danger">Confirmar</button>
        </div>
      </div>
    </Transition>
  </dialog>
</template>

<style lang="scss" scoped>
dialog[open] {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  padding: 0;
  background: transparent;

  &::backdrop {
    background: #00000025;
    backdrop-filter: blur(4px);
  }
}

.app-confirmation-modal {
  background: var(--color-light-1);
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #00000014;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  gap: 24px;

  & > .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
  }

  & > .description {
    font-size: 16px;
  }

  & > .actions {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>
