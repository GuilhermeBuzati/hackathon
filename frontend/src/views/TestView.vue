<script setup lang="ts">
import { computed, ref } from "vue";
import AppInputText from "@/components/AppInputText.vue";
import AppSelect from "@/components/AppSelect.vue";
import AppEmpty from "@/components/AppEmpty.vue";
import TestItem from "@/components/TestItem.vue";
import { useTestStore } from "@/store/test_store";
import { useSubjectStore } from "@/store/subject_store";
import type { SubjectModel } from "@/models/subject_model";
import type { TestModel } from "@/models/test_model";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useTestStore();
const subjectStore = useSubjectStore();

const search = ref("");
const subject = ref<SubjectModel | null>(null);

const filteredTests = computed(() => {
  let data = store.data.values();

  if (search.value.trim() !== "") {
    const searchValue = search.value.trim().toLowerCase();
    data = data.filter(s => s.title.toLowerCase().includes(searchValue));
  }

  if (subject.value !== null) {
    const subjectId = subject.value.id;
    data = data.filter(s => subjectId === s.subject.id);
  }

  return data.toArray();
});

async function onRemove(item: TestModel): Promise<void> {
  const error = await store.remove(item.id);
  if (error) {
    alert(error);
  }
}

function onPrint(item: TestModel): void {
  router.push(`/test/print/${item.id}`);
}

function onEdit(item: TestModel): void {
  router.push("/test/" + item.id);
}
</script>

<template>
  <div class="test-view">
    <div class="header">
      <h2>Minhas Provas</h2>

      <RouterLink
        class="app-button -brand"
        to="/test/new">
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
          option-key="id"
          clear
          :options="subjectStore.data">
          <template #item="{ value }">
            {{ value.description }}
          </template>
        </AppSelect>
      </aside>

      <AppEmpty
        style="margin-top: 40px"
        v-if="filteredTests.length === 0" />

      <div
        v-else
        class="test-list">
        <TestItem
          v-for="test of filteredTests"
          :key="test.id"
          :test
          @remove="onRemove(test)"
          @print="onPrint(test)"
          @edit="onEdit(test)" />
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
