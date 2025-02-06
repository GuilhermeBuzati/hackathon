<script setup lang="ts">
import AppIcon from "@/components/AppIcon.vue";
import AppInputText from "@/components/AppInputText.vue";
import { useTeacherStore } from "@/store/teacher_store";
import { useTestStore } from "@/store/test_store";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useTestStore();
const teacherStore = useTeacherStore();

const item = store.getItem(parseInt(route.params.id as string))!;
const teacher = teacherStore.user!;

const title = ref(item.title);
const teacherName = ref(teacher.name);
const schoolClass = ref("");
const subject = ref(item.subject.description);

const element = ref<HTMLIFrameElement | null>(null);

function onPrint(): void {
  if (element.value === null) {
    return;
  }

  element.value.contentWindow?.print();
}

watchEffect(() => {
  if (element.value === null) {
    return;
  }

  const doc = element.value.contentDocument!;

  const htmlUl = item.questions.map(
    i => `
          <li class="test-question no-break">
            <header class="title">${i.description}</header>
            <ul class="content">
              ${i.responses.map(r => `<li>${r}</li>`)}
            </ul>
          </li>`,
  );

  const htmlContent = `
    <html>
      <head>
        <title>Jovem de Valor</title>
      </head>
      <style>

        @page {
          size: A4;
          margin: 2cm
        }

        body {
          -webkit-print-color-adjust: exact; /* Mantém cores na impressão */
        }

        .no-break {
          page-break-inside: avoid; /* Evita que o conteúdo seja dividido */
        }


        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }

        .test-print-preview {
          display: flex;
          flex-direction: column;

          & > .header {
            display: flex;
            flex-direction: column;
            gap: 8pt;
            margin-bottom: 48pt;
          }

          & > .subtitle {
            font-size: 16pt;
          }
        }

        .test-first-line {
          font-weight: bold;
          display: grid;
          grid-template-columns: 1fr 80pt;
          gap: 48pt;
          align-items: flex-end;

          & > .title {
            font-size: 20pt;
          }

          & > .value {
            font-size: 16pt;
          }
        }

        .test-second-line {
          font-size: 14pt;
          color: #77767b;
        }

        .test-question {
          font-size: 12pt;
          line-height: 14pt;

          & > .title {
            font-weight: 600;
            margin-bottom: 16pt;
            margin-left: 4pt;
          }

          & > .content {
            margin-left: 24pt;
            display: flex;
            flex-direction: column;
            list-style: lower-alpha;
          }
        }
      </style>
    </html>
    <body class="test-print-preview">

        <div class="header">
          <p class="test-first-line">
            <span class="title">${title.value} • ${subject.value}</span>
            <span class="value">Nota:</span>
          </p>

          <p class="test-second-line">${schoolClass.value} • ${teacherName.value}</p>
        </div>

        <ul
          style="
            display: flex;
            flex-direction: column;
            gap: 24pt;
            list-style: decimal;
            margin-left: 16px;
          ">
          ${htmlUl.join("   ")}
        </ul>
    </body>
  `;

  doc.open();
  doc.writeln(htmlContent);
  doc.close();
});
</script>

<template>
  <div class="test-print-view">
    <div>
      <RouterLink
        class="app-back-button _mb-3"
        to="/test">
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
        v-model="teacherName"
        label="Professor" />

      <AppInputText
        v-model="subject"
        label="Matéria" />

      <AppInputText
        v-model="schoolClass"
        label="Turma" />

      <div style="display: flex; justify-content: center">
        <button
          class="app-button -brand"
          @click="onPrint()">
          Imprimir
        </button>
      </div>
    </div>

    <iframe
      ref="element"
      hidden />
  </div>
</template>

<style lang="scss" scoped>
.test-print-view {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  margin: 0 auto;
  gap: 32px;
}

.test-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
