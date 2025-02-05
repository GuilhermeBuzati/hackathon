<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import AppInputText from "./AppInputText.vue";
import { useSubjectStore } from "@/store/subject_store";

const subjectStore = useSubjectStore();

const isOpen = defineModel("is-open", { default: false });

const dialogRef = ref<HTMLDialogElement | null>(null);

watch(isOpen, () => handleModal());

onMounted(() => handleModal());

const text = ref("");

function handleModal(): void {
  if (isOpen.value) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
    text.value = "";
  }
}

async function onSave(): Promise<void> {
  await subjectStore.create(text.value);
  isOpen.value = false;
}
</script>

<template>
  <dialog
    ref="dialogRef"
    @close="isOpen = false"
    @click="isOpen = false">
    <Transition name="modal">
      <form
        @submit.prevent="onSave()"
        @click.stop
        v-if="isOpen"
        class="app-create-modal">
        <h1 class="title">Nova Matéria</h1>

        <div style="align-self: stretch">
          <AppInputText
            v-model="text"
            placeholder="Escreva o nome"
            :focus-input="true" />
        </div>

        <div class="actions">
          <button
            type="submit"
            class="app-button -brand">
            Create
          </button>

          <button
            type="button"
            class="app-button"
            style="order: -1"
            @click="isOpen = false">
            Cancelar
          </button>
        </div>
      </form>
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

.app-create-modal {
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

  & > .actions {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>
