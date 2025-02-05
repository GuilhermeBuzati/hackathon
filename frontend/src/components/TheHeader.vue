<script lang="ts" setup>
import { onUnmounted, ref, watchEffect } from "vue";
import AppIcon from "./AppIcon.vue";
import { useTeacherStore } from "@/store/teacher_store";
import { useRouter } from "vue-router";

const header = ref<HTMLHeadElement>();
const applyShadow = ref(false);
const router = useRouter();

const store = useTeacherStore();

let observer: IntersectionObserver | null = null;

const dataScroll = ref<HTMLElement | null>(null);

onUnmounted(() => {
  observer?.disconnect();
});

watchEffect(() => {
  if (!dataScroll.value) {
    return;
  }

  observer?.disconnect();

  observer = new IntersectionObserver(
    ([entry]) => {
      applyShadow.value = !entry.isIntersecting;
    },
    { rootMargin: "0px 0px 0px 0px", threshold: 0.5 },
  );

  if (header.value) {
    observer.observe(dataScroll.value);
  }
});

function onLogout(): void {
  store.logout();
  router.push("/auth/login");
}
</script>

<template>
  <div ref="dataScroll"></div>
  <header
    ref="header"
    class="the-header"
    :class="{ '-shadow': applyShadow }">
    <div class="the-header-container">
      <h1 class="title">
        <span class="_text-brand">Hacka</span>
        <span>Prova</span>
      </h1>

      <div class="app-header-switcher">
        <RouterLink
          to="/question"
          class="item"
          active-class="-active">
          Perguntas
        </RouterLink>
        <RouterLink
          to="/test"
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
        <div class="name-dropdown">
          {{ store.user?.name ?? "Invalido" }}
          <AppIcon name="chevron-down" />

          <div class="popup">
            <button
              class="app-button -flat -small"
              style="
                justify-content: flex-start;
                padding: 8px 16px;
                font-weight: 400;
              "
              @click="onLogout()">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.the-header {
  position: sticky;
  top: 0;
  container-type: inline-size;
  padding: 4px 12px 0 12px;
  z-index: 2000;

  width: 100%;
  backdrop-filter: blur(48px);
  background: #ffffffa0;

  border: 1px solid transparent;
  transition: 0.2s ease;

  &.-shadow {
    box-shadow: 0 4px 8px #00000014;
    border-color: var(--color-light-2);
  }
}

.the-header-container {
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  padding: 8px 16px;
  height: 64px;
  gap: 16px;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;

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

.name-dropdown {
  position: relative;

  & > .popup {
    padding: 4px 0;
    transition: 0.3s ease;
    top: calc(100% + 4px);
    right: 0;
    left: 0;
    border: 1px solid var(--color-light-3);
    box-shadow: 0 4px 8px #00000014;
    border-radius: 4px;
    background-color: var(--color-light-1);
    position: absolute;
    display: none;
    flex-direction: column;
  }

  &:hover > .popup {
    display: flex;
  }
}
</style>
