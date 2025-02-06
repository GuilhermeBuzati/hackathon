<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppInputText from "./AppInputText.vue";
import { useQuestionStore } from "@/store/question_store";
import type { SubjectModel } from "@/models/subject_model";
import AppQuestionResponse from "./AppQuestionResponse.vue";
import type { QuestionModel } from "@/models/question_model";

const isOpen = defineModel("is-open", { default: false });

const dialogRef = ref<HTMLDialogElement | null>(null);

const props = defineProps<{ subject: SubjectModel }>();

const emits = defineEmits<{
  selected: [data: QuestionModel[]];
}>();

watch(isOpen, () => handleModal());

onMounted(() => handleModal());

const store = useQuestionStore();

const search = ref("");

const selectedQuestions = ref<QuestionModel[]>([]);

const filtered = computed(() => {
  let data = store.questions.values();

  data = data.filter(s => {
    return s.topic.subject.id === props.subject.id;
  });

  if (search.value.trim() !== "") {
    const value = search.value.toLowerCase();
    data = data.filter(s => s.description.toLowerCase().includes(value));
  }

  return data.toArray();
});

function handleModal(): void {
  if (isOpen.value) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
    search.value = "";
  }
}

async function onSave(): Promise<void> {
  emits("selected", selectedQuestions.value);
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
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px">
            Banco de Perguntas
          </h1>
          <p style="color: var(--color-dark-2)">
            <span style="font-weight: bold">Matéria:</span>
            {{ subject.description }}
          </p>
        </div>

        <AppInputText
          v-model="search"
          icon-start="search"
          placeholder="Pesquisar"
          :focus-input="true" />

        <div
          style="
            overflow-y: auto;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 16px;
            background-color: var(--color-light-2);
            border-radius: 8px;
          ">
          <AppQuestionResponse
            v-for="item of filtered"
            :key="item.id"
            :question="item"
            v-model="selectedQuestions" />
        </div>

        <div class="actions">
          <p>{{ selectedQuestions.length }} selecionados</p>

          <div style="display: flex; gap: 8px">
            <button
              type="submit"
              class="app-button -brand">
              Adicionar
            </button>

            <button
              type="button"
              class="app-button -flat -brand"
              style="order: -1"
              @click="isOpen = false">
              Cancelar
            </button>
          </div>
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
  width: 640px;
  height: 640px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #00000014;
  border: none;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  padding: 24px;
  gap: 24px;

  & > .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 24px;
  }

  & > .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-light-4);
  border-radius: 12px;
  border: 4px solid var(--color-light-2);
}
</style>
