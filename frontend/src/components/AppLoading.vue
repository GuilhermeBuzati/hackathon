<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
  0% {
    box-shadow:
      20px 0 #000,
      -20px 0 #0002;
    background: var(--color-brand-3);
  }
  33% {
    box-shadow:
      20px 0 #000,
      -20px 0 #0002;
    background: #0002;
  }
  66% {
    box-shadow:
      20px 0 #0002,
      -20px 0 var(--color-brand-3);
    background: #0002;
  }
  100% {
    box-shadow:
      20px 0 #0002,
      -20px 0 var(--color-brand-3);
    background: var(--color-brand-3);
  }
}
</style>
