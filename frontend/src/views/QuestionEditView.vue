<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import AppInputTextArea from "@/components/AppInputTextArea.vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import { onMounted, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import AppConfirmationModal from "@/components/AppConfirmationModal.vue";
import { useRoute } from "vue-router";
import type { QuestionModel } from "@/models/question_model";

const description = ref("");

const materia = ref("");

const tema = ref("");

const responses = ref<string[]>([]);

const responsesEl = ref<HTMLElement | null>(null);

const modalOpen = ref(false);

const isEditing = ref(false);

const route = useRoute();

onMounted(() => {
  const data = route.meta.item as QuestionModel | undefined | null;
  if (data) {
    isEditing.value = true;
    description.value = data.descricao;
    tema.value = data.tema;
    responses.value = data.respostas;
  }
});

function onRemoveResposta(index: number): void {
  responses.value.splice(index, 1);
}

function onAddResponse(): void {
  responses.value.push("");
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
      to="/questions">
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
          v-model="materia"
          label="Matéria"
          :options="[]" />

        <AppSelect
          v-model="tema"
          label="Tema"
          :options="[]" />

        <AppInputTextArea
          v-model="description"
          label="Pergunta"
          rows="4" />

        <div style="display: flex; gap: 8px">
          <button class="app-button -brand">
            {{ isEditing ? "Atualizar" : "Salvar" }}
          </button>
          <RouterLink
            class="app-button -flat"
            to="/questions">
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
                  @click="onRemoveResposta(index)"
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
    <AppConfirmationModal v-model:is-open="modalOpen">
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
