<script setup lang="ts">
import { computed, ref } from "vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useQuestionStore } from "@/store/question_store";
import AppEmpty from "@/components/AppEmpty.vue";
import AppLoading from "@/components/AppLoading.vue";
import { useSubjectStore } from "@/store/subject_store";
import type { SubjectModel } from "@/models/subject_model";
import { useTopicStore } from "@/store/topic_store";
import type { TopicModel } from "@/models/topic_model";

const search = ref("");
const subject = ref<SubjectModel | null>(null);
const topic = ref<TopicModel | null>(null);

const store = useQuestionStore();
const subjectStore = useSubjectStore();
const topicStore = useTopicStore();

const filteredQuestions = computed(() => {
  let data = store.questions.values();

  if (search.value.trim() !== "") {
    const searchValue = search.value.trim().toLowerCase();
    data = data.filter(s => s.description.toLowerCase().includes(searchValue));
  }

  if (subject.value !== null && topic.value === null) {
    const subjectTopics = new Set(subject.value.topics.map(s => s.id));
    data = data.filter(s => subjectTopics.has(s.topic.id));
  }

  if (topic.value !== null) {
    data = data.filter(s => topic.value?.id === s.topic.id);
  }

  return data.toArray();
});

const topicOptions = topicStore.selectDataBySubject(subject);
</script>

<template>
  <div class="question-view">
    <div class="header">
      <h2>Minhas Perguntas</h2>
      <RouterLink
        class="app-button -brand"
        to="/question/new">
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
          option-key="id"
          :options="subjectStore.data"
          clear>
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>

        <AppSelect
          v-model="topic"
          label="Tema"
          clear
          option-key="id"
          :options="topicOptions">
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>
      </aside>

      <AppLoading
        style="margin-top: 40px"
        v-if="store.isLoading" />

      <AppEmpty
        style="margin-top: 40px"
        v-else-if="filteredQuestions.length === 0" />

      <div
        v-else
        class="question-grid">
        <RouterLink
          v-for="item in filteredQuestions"
          :key="item.id"
          :to="`/question/${item.id}`">
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
  display: flex;
  flex-direction: column;

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
  grid-auto-rows: min-content;
  gap: 24px;
}
</style>
