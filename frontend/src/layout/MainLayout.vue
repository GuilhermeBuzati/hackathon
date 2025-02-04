<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { useQuestionStore } from "@/store/question_store";
import { useSubjectStore } from "@/store/subject_store";
import { onMounted } from "vue";

onMounted(() => {
  const questionStore = useQuestionStore();
  const subjectStore = useSubjectStore();
  questionStore.load();
  subjectStore.load();
});
</script>

<template>
  <div class="main-layout">
    <TheHeader />

    <main>
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          name="routing">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
