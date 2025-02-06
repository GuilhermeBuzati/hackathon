<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import AppInputText from "@/components/AppInputText.vue";
import AppQuestionReponseAccordion from "@/components/AppQuestionReponseAccordion.vue";
import AppSelect from "@/components/AppSelect.vue";
import TestEditIncludeQuestion from "@/components/TestEditIncludeQuestion.vue";
import type { QuestionModel } from "@/models/question_model";
import type { SubjectModel } from "@/models/subject_model";
import { useSubjectStore } from "@/store/subject_store";
import { useTestStore } from "@/store/test_store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const subjectStore = useSubjectStore();
const testStore = useTestStore();

const router = useRouter();
const route = useRoute();

const initial = testStore.getItem(parseInt(route.params.id as string));

const subject = ref<SubjectModel | null>(initial?.subject ?? (null as any));

const title = ref(initial?.title ?? "");

const modalOpen = ref(false);

const selected = ref<QuestionModel[]>(initial?.questions ?? ([] as any));

const isEdit = initial !== null;

function onSelect(data: QuestionModel[]): void {
  selected.value = data;
}

function onRemoveSelected(item: QuestionModel): void {
  const index = selected.value.findIndex(s => s.id === item.id);
  if (index >= 0) {
    selected.value.splice(index, 1);
  }
}

async function onSave(): Promise<void> {
  if (
    title.value.trim() === "" ||
    subject.value === null ||
    selected.value.length === 0
  ) {
    return;
  }

  if (isEdit) {
    await testStore.update(
      initial.id!,
      title.value,
      selected.value.map(s => s.id),
      subject.value.id,
    );
  } else {
    await testStore.create(
      title.value,
      selected.value.map(s => s.id),
      subject.value.id,
    );
  }

  router.push("/test");
}
</script>

<template>
  <div class="question-edit-view">
    <RouterLink
      class="app-back-button _mb-3"
      to="/test">
      <AppIcon name="chevron-left" /> Voltar
    </RouterLink>

    <div class="header">
      <h2 style="font-weight: bold; font-size: 32px">
        {{ isEdit ? "Editar" : "Nova" }} Prova
      </h2>
    </div>

    <div class="grid">
      <div style="display: flex; flex-direction: column; gap: 24px">
        <AppInputText
          v-model="title"
          label="Título" />

        <AppSelect
          v-model="subject"
          option-key="id"
          label="Matéria"
          :options="subjectStore.data">
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>

        <div style="display: flex; gap: 8px">
          <button
            class="app-button -brand"
            @click="onSave()">
            {{ isEdit ? "Atualizar" : "Salvar" }}
          </button>
          <RouterLink
            to="/test"
            class="app-button -brand -flat">
            Cancelar
          </RouterLink>
        </div>
      </div>

      <div>
        <h4 style="font-weight: bold; margin-bottom: 4px; line-height: 24px">
          Cadastrar Perguntas
        </h4>

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 8px;
          ">
          <AppQuestionReponseAccordion
            v-for="question of selected"
            :key="question.id"
            :question
            @removed="onRemoveSelected(question)" />
        </div>

        <button
          class="app-button -flat -small -brand"
          @click="modalOpen = true">
          <AppIcon name="plus" />
          Adicionar Pergunta
        </button>
      </div>
    </div>
    <TestEditIncludeQuestion
      v-if="subject"
      :subject="subject"
      @selected="onSelect($event)"
      v-model:is-open="modalOpen" />
  </div>
</template>

<style lang="scss" scoped>
.question-edit-view {
  max-width: 860px;
  padding-top: 60px;
  margin: 0 auto;

  & > .header {
    margin-bottom: 32px;
  }

  & > .grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 64px;
  }
}

.btn-handle {
  background-color: transparent;
  width: 16px;
  height: 16px;
  outline: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  cursor: grab;
}

.btn-remove {
  background-color: transparent;
  width: 16px;
  height: 16px;
  outline: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.drag-ghost {
  opacity: 1;
  box-shadow: 0 2px 4px #00000014;
  border-radius: 8px;
}

.drag-preview {
  opacity: 0;
}
</style>
