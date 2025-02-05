<script setup lang="ts">
import AppIcon from "./AppIcon.vue";
</script>

<template>
  <div class="app-empty">
    <AppIcon
      name="filter"
      class="icon" />

    <p class="title">Registro Vazio</p>

    <p class="subtitle">
      Parece que não foi encontrado <br />
      nenhuma resposta
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-empty {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--color-dark-2);
  text-align: center;
  align-items: center;

  & > .icon {
    font-size: 48px;
  }

  & > .title {
    font-size: 24px;
    font-weight: bold;
  }

  & > .subtitle {
    font-size: 16px;
  }
}
</style>
