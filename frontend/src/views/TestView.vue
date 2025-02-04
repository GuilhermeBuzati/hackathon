<script setup lang="ts">
import { ref } from "vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import TestItem from "@/components/TestItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const search = ref("");
const subject = ref("");
const theme = ref("");
const period = ref("");

const subjectList = ref(["Matemática", "Português", "Geografia"]);
const themeList = ref(["Artaxerxes", "Julio Cesar", "Ronaldo Fenômeno"]);
const periodList = ref(["9º ano", "8º ano", "7º ano", "6º ano"]);

function onPrint(_: string): void {
  router.push({ name: "test-print" });
}
</script>

<template>
  <div class="test-view">
    <div class="header">
      <h2>Minhas Provas</h2>

      <RouterLink
        class="app-button -brand"
        to="/tests/new">
        Nova Prova
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
          v-model="period"
          label="Período"
          :options="periodList" />

        <AppSelect
          v-model="theme"
          label="Tema"
          :options="themeList" />
      </aside>

      <div class="test-list">
        <TestItem @print="onPrint($event)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-view {
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
    grid-template-columns: 280px 1fr;
    gap: 48px;
  }
}

.test-list {
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    border-top: 1px solid var(--color-light-2);
  }
}
</style>
