<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppInputText from "./AppInputText.vue";

const isOpen = defineModel("is-open", { default: false });

const dialogRef = ref<HTMLDialogElement | null>(null);

const emits = defineEmits<{
  create: [value: { description: string; period: string }];
}>();

watch(isOpen, () => handleModal());

onMounted(() => handleModal());

const description = ref("");
const period = ref("");

function handleModal(): void {
  if (isOpen.value) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
    description.value = "";
    period.value = "";
  }
}

async function onSave(): Promise<void> {
  emits("create", { description: description.value, period: period.value });
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

        <div
          style="
            align-self: stretch;
            display: flex;
            flex-direction: column;
            gap: 8px;
          ">
          <AppInputText
            v-model="description"
            placeholder="Nome"
            :focus-input="true" />

          <AppInputText
            v-model="period"
            placeholder="Periodo" />
        </div>

        <div class="actions">
          <button
            type="submit"
            class="app-button -brand">
            Criar
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
