<script setup lang="ts">
import AppInputText from "@/components/AppInputText.vue";
</script>

<template>
  <div class="subject-view">
    <div class="subject-header">
      <h2 class="title">Grades</h2>

      <div style="display: flex; gap: 8px">
        <AppInputText
          style="width: 340px"
          icon-start="search" />
        <button class="app-button -brand">Nova Grade</button>
      </div>
    </div>

    <div class="subject-grid">
      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>

      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>

      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>

      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>

      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>

      <RouterLink
        to=""
        class="item">
        Matemática
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subject-view {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  max-width: 1024px;
  padding: 0 24px;
  margin: 60px auto 0 auto;
}

.subject-header {
  & > .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
  }
}

.subject-grid {
  align-self: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;

  & > .item {
    background-color: var(--color-light-2);
    border-radius: 8px;
    color: var(--color-brand-3);
    padding: 24px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    transition: 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      background: color-mix(
        in srgb,
        var(--color-brand-3) 10%,
        var(--color-light-1) 90%
      );
    }
  }
}
</style>
