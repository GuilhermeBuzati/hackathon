<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <header class="header">
      <h1>
        <span class="_text-brand">Hacka</span>
        <span>Prova</span>
      </h1>
    </header>

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="routing">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-bottom: 24px;
  overflow-x: hidden;
  overflow-y: auto;

  & > .header {
    height: 64px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    align-items: center;
  }
}
</style>
