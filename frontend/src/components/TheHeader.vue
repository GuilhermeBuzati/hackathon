<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import AppIcon from "./AppIcon.vue";

const header = ref<HTMLHeadElement>();
const applyShadow = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      console.log("OI OI OI", entry);
      applyShadow.value = entry.isIntersecting;
    },
    { rootMargin: "0px 0px 0px 0px", threshold: 0.5 },
  );

  if (header.value) {
    observer.observe(header.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="the-header-container">
    <header
      ref="header"
      class="the-header"
      :class="{ '-shadow': applyShadow }">
      <h1 class="title">
        <span class="_text-brand">Hacka</span>
        <span>Prova</span>
      </h1>

      <div class="app-header-switcher">
        <RouterLink
          to="/questions"
          class="item"
          active-class="-active">
          Perguntas
        </RouterLink>
        <RouterLink
          to="/tests"
          class="item"
          active-class="-active">
          Provas
        </RouterLink>
        <RouterLink
          to="/subject"
          class="item"
          active-class="-active">
          Matérias
        </RouterLink>
      </div>

      <div class="config">
        <p>
          José Antônio Nunes
          <AppIcon name="chevron-down" />
        </p>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.the-header-container {
  position: sticky;
  top: 0;
  container-type: inline-size;
  padding: 4px 12px 0 12px;
  z-index: 2000;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
}

.the-header {
  background: #ffffff10;
  // border: 1px solid var(--color-light-3);
  border-radius: 8px;
  backdrop-filter: blur(48px);
  padding: 8px 16px;
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  gap: 16px;
  align-items: center;
  height: 64px;

  & > .title {
    font-size: 24px;
  }

  & > .switch {
    justify-content: center;
    display: flex;
  }

  & > .config {
    display: flex;
    justify-content: flex-end;
  }
}

.app-header-switcher {
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 8px;

  & > .item {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    height: 40px;
    outline: none;
    color: var(--color-dark-5);
    background: var(--color-light-1);
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
    text-decoration: none;
  }

  & > .item.-active {
    background: var(--color-light-2);
  }
}
</style>
