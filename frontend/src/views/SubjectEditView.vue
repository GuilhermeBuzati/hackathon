<script lang="ts" setup>
import AppIcon from "@/components/AppIcon.vue";
import AppInputTextArea from "@/components/AppInputTextArea.vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import { onMounted, ref } from "vue";
import AppConfirmationModal from "@/components/AppConfirmationModal.vue";
import { useRoute } from "vue-router";
import type { SubjectModel } from "@/models/subject_model";

const description = ref("");

const materia = ref("");

const tema = ref("");

const responses = ref<string[]>([]);

const responsesEl = ref<HTMLElement | null>(null);

const modalOpen = ref(false);

const isEditing = ref(false);

const route = useRoute();

onMounted(() => {
  const data = route.meta.item as SubjectModel;
  description.value = data.description;
});
</script>

<template>
  <div class="subject-edit-view">
    <RouterLink
      class="app-back-button _mb-3"
      to="/subject">
      <AppIcon name="chevron-left" /> Voltar
    </RouterLink>

    <div class="header">
      <h2 style="font-weight: bold; font-size: 32px">
        {{ description }}
      </h2>
      <div>
        <button class="app-button -danger -flat">Excluir</button>
        <button class="app-button -brand">Editar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subject-edit-view {
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
</style>
