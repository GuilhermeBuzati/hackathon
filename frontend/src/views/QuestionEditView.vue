<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import AppInputTextArea from "@/components/AppInputTextArea.vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import { ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import AppConfirmationModal from "@/components/AppConfirmationModal.vue";
import { useRouter } from "vue-router";
import type { QuestionModel } from "@/models/question_model";
import { useQuestionStore } from "@/store/question_store";
import { useSubjectStore } from "@/store/subject_store";
import { useTopicStore } from "@/store/topic_store";
import type { SubjectModel } from "@/models/subject_model";
import type { TopicModel } from "@/models/topic_model";

const store = useQuestionStore();
const subjectStore = useSubjectStore();
const topicStore = useTopicStore();

const { item = null } = defineProps<{ item?: QuestionModel }>();

const description = ref(item?.description ?? "");

const subject = ref<SubjectModel | null>(item?.topic?.subject ?? null);

const topic = ref<TopicModel | null>(item?.topic ?? null);

const responses = ref<string[]>(item?.responses ?? []);

const responsesEl = ref<HTMLElement | null>(null);

const topicOptions = topicStore.selectDataBySubject(subject, false);

const modalOpen = ref(false);

const isEditing = ref(item !== null);

const router = useRouter();

function onRemoveResponse(index: number): void {
  responses.value.splice(index, 1);
}

function onAddResponse(): void {
  responses.value.push("");
}

async function onRemove(): Promise<void> {
  const error = await store.remove(item!.id);
  if (error) {
    alert(error);
    return;
  }

  router.push("/question");
}

async function onSubmit(): Promise<void> {
  if (responses.value.length === 0) {
    return;
  }

  const result = await store.create(
    description.value,
    topic.value!.id,
    responses.value,
  );
  if (result) {
    alert(result);
    return;
  }

  router.push("/question");
}

useDraggable(responsesEl, responses, {
  animation: 250,
  handle: ".btn-handle",
  ghostClass: "drag-ghost",
  dragClass: "drag-preview",
  easing: "cubic-bezier(0, 0, 0.2, 1)",
});
</script>

<template>
  <div class="question-edit-view">
    <RouterLink
      class="app-back-button _mb-3"
      to="/question">
      <AppIcon name="chevron-left" /> Voltar
    </RouterLink>

    <div class="header">
      <h2 style="font-weight: bold; font-size: 32px">
        {{ isEditing ? "Editar" : "Nova" }} Pergunta
      </h2>
      <button
        v-if="isEditing"
        class="app-button -danger -flat -icon"
        @click="modalOpen = true">
        <AppIcon name="trash-2" />
      </button>
    </div>

    <div class="grid">
      <div style="display: flex; flex-direction: column; gap: 24px">
        <AppSelect
          v-model="subject"
          label="Matéria"
          option-key="id"
          :options="subjectStore.data">
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>

        <AppSelect
          v-model="topic"
          label="Tema"
          option-key="id"
          :options="topicOptions">
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>

        <AppInputTextArea
          v-model="description"
          label="Pergunta"
          rows="4" />

        <div style="display: flex; gap: 8px">
          <button
            class="app-button -brand"
            @click="onSubmit()">
            {{ isEditing ? "Atualizar" : "Salvar" }}
          </button>
          <RouterLink
            class="app-button -flat"
            to="/question">
            Cancelar
          </RouterLink>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px">
        <h4 style="font-weight: bold; line-height: 24px">Respostas</h4>

        <ul
          ref="responsesEl"
          style="display: flex; flex-direction: column; gap: 4px">
          <li
            v-for="(_, index) in responses"
            :key="index"
            style="transition: 0.3s ease">
            <AppInputText v-model="responses[index]">
              <template #iconStart>
                <button
                  class="btn-handle"
                  tabindex="-1">
                  <AppIcon name="grid" />
                </button>
              </template>

              <template #iconEnd>
                <button
                  class="btn-remove"
                  @click="onRemoveResponse(index)"
                  tabindex="-1">
                  <AppIcon name="x" />
                </button>
              </template>
            </AppInputText>
          </li>
        </ul>

        <div>
          <button
            class="app-button -brand -flat -small"
            @click="onAddResponse()">
            <AppIcon name="plus" />
            Adicionar Resposta
          </button>
        </div>
      </div>
    </div>
    <AppConfirmationModal
      @confirm="onRemove()"
      v-model:is-open="modalOpen">
      <template #title> Exclusão! </template>
      <template #description>
        <p style="font-weight: bold; margin-bottom: 16px; text-align: center">
          Tem certeza que deseja excluir a pergunta:
        </p>
        <p style="text-align: center">"{{ description || "Olá Marilene" }}"</p>
      </template>
    </AppConfirmationModal>
  </div>
</template>

<style lang="scss" scoped>
.question-edit-view {
  max-width: 860px;
  padding-top: 60px;
  margin: 0 auto;

  & > .header {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
