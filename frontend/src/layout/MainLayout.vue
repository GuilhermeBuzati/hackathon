<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { useQuestionStore } from "@/store/question_store";
import { useSubjectStore } from "@/store/subject_store";
import { useTestStore } from "@/store/test_store";
import { onMounted } from "vue";

onMounted(() => {
  const questionStore = useQuestionStore();
  const subjectStore = useSubjectStore();
  const testStore = useTestStore();
  questionStore.load();
  subjectStore.load();
  testStore.load();
});
</script>

<template>
  <div class="main-layout">
    <TheHeader />

    <main style="flex: 1">
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
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
