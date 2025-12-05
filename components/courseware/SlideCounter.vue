<template>
  <div class="slide-counter">
    <span class="counter-text">幻灯片 {{ currentIndex + 1 }}/{{ totalSlides }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentIndex: number
  totalSlides: number
}>()
</script>

<style scoped>
.slide-counter {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  backdrop-filter: blur(4px);
}

.counter-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}
</style>
