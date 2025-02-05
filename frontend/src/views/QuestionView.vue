<script setup lang="ts">
import { computed, ref } from "vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useQuestionStore } from "@/store/question_store";
import AppEmpty from "@/components/AppEmpty.vue";
import AppLoading from "@/components/AppLoading.vue";

const search = ref("");
const subject = ref("");
const theme = ref("");
const period = ref("");

const store = useQuestionStore();

const filteredQuestions = computed(() => {
  if (search.value.trim() === "") {
    return store.questions;
  }

  const searchValue = search.value.trim().toLowerCase();
  return store.questions.filter(item => {
    return item.descricao.toLowerCase().includes(searchValue);
  });
});

const subjectList = ref(["Matemática", "Português", "Geografia"]);
const themeList = ref(["Artaxerxes", "Julio Cesar", "Ronaldo Fenômeno"]);
const periodList = ref(["9º ano", "8º ano", "7º ano", "6º ano"]);
</script>

<template>
  <div class="question-view">
    <div class="header">
      <h2>Minhas Perguntas</h2>
      <RouterLink
        class="app-button -brand"
        to="/questions/new">
        Nova Pergunta
      </RouterLink>
    </div>

    <div class="grid">
      <aside style="display: flex; flex-direction: column; gap: 16px">
        <AppInputText
          v-model="search"
          placeholder="Pesquise aqui..."
          icon-start="search" />

        <AppSelect
          v-model="subject"
          label="Matéria"
          :options="subjectList" />

        <AppSelect
          v-model="theme"
          label="Tema"
          :options="themeList" />
      </aside>

      <AppLoading
        style="margin-top: 40px"
        v-if="store.isLoading" />

      <AppEmpty
        style="margin-top: 40px"
        v-else-if="store.isEmpty" />

      <div
        v-else
        class="question-grid">
        <RouterLink
          v-for="item in filteredQuestions"
          :key="item.id"
          :to="`/questions/${item.id}`">
          <QuestionCard :item />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-view {
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 60px 16px 16px 16px;

  & > .header {
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 32px;
  }

  & > .grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 48px;
  }
}

.question-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
</style>
