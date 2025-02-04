<script setup lang="ts">
import AppIcon from "@/components/AppIcon.vue";
import AppInputText from "@/components/AppInputText.vue";
import { ref } from "vue";

const title = ref("Prova de Economia");
const teacher = ref("Antônio Nunes");
const schoolClass = ref("9º Ano B");
const subject = ref("Matemática");
</script>

<template>
  <div class="test-print-view">
    <div>
      <div>
        <RouterLink
          class="app-back-button _mb-3"
          to="/tests">
          <AppIcon name="chevron-left" />
          Voltar
        </RouterLink>

        <div class="test-header">
          <h2 style="font-weight: bold; font-size: 32px">Imprimir Prova</h2>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px">
        <AppInputText
          v-model="title"
          label="Título" />

        <AppInputText
          v-model="teacher"
          label="Professor" />

        <AppInputText
          v-model="schoolClass"
          label="Turma" />

        <AppInputText
          v-model="subject"
          label="Matéria" />

        <div style="display: flex; gap: 8px">
          <button class="app-button -brand">Imprimir</button>
          <button class="app-button -flat -brand">Salvar</button>
        </div>
      </div>
    </div>

    <div>
      <div class="test-print-preview">
        <div class="header">
          <p class="test-first-line">
            <span class="title">{{ title }} • {{ subject }}</span>
            <span class="value">Nota:</span>
          </p>

          <p class="test-second-line">{{ schoolClass }} • {{ teacher }}</p>
        </div>

        <ul
          style="
            display: flex;
            flex-direction: column;
            gap: 24px;
            list-style: decimal;
            margin-left: 16px;
          ">
          <li class="test-question">
            <header class="title">Quem foi aqui resolver o problema</header>
            <ul class="content">
              <li>Julio</li>
              <li>Ronaldo</li>
              <li>Carlos</li>
            </ul>
          </li>

          <li class="test-question">
            <header class="title">Quem foi aqui resolver o problema</header>
            <ul class="content">
              <li>Julio</li>
              <li>Ronaldo</li>
              <li>Carlos</li>
            </ul>
          </li>

          <li class="test-question">
            <header class="title">Quem foi aqui resolver o problema</header>
            <ul class="content">
              <li>Julio</li>
              <li>Ronaldo</li>
              <li>Carlos</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-print-view {
  max-width: 1024px;
  padding-top: 60px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 64px;
}

.test-header {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.test-print-preview {
  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 8px #00000014;
  width: 794px;
  height: 1123px;
  transform: scale(0.7);
  transform-origin: top left;
  padding: 24px;

  & > .header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 48px;
  }

  & > .subtitle {
    font-size: 16px;
  }
}

.test-first-line {
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 24px;
  align-items: flex-end;

  & > .title {
    font-size: 24px;
  }

  & > .value {
    font-size: 20px;
  }
}

.test-second-line {
  font-size: 16px;
  color: var(--color-dark-1);
}

.test-question {
  font-size: 14px;

  & > .title {
    font-weight: 500;
    margin-bottom: 16px;
    margin-left: 4px;
  }

  & > .content {
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: lower-alpha;
  }
}
</style>
