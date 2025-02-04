<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ name: IconName }>();

const iconName = computed(() => `icon-${props.name}`);
</script>

<template>
  <i :class="iconName" />
</template>
