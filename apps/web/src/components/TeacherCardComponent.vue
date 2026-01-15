<template>
  <n-card 
    class="max-w-4xl mx-auto rounded-3xl overflow-hidden backdrop-blur-md border border-white/10"
    :bordered="false"
    content-style="padding: 0;"
  >
    <!-- Search Section -->
    <div class="relative px-6 pt-6 pb-4">
      <TeacherSearchBar />
    </div>
    
    <!-- Separator -->
    <n-divider class="!my-2">
      <div class="w-1.5 h-1.5 rounded-full bg-green-500/60 shadow-[0_0_10px_rgba(66,184,131,0.4)]"></div>
    </n-divider>
    
    <!-- Table Section -->
    <div class="px-4 pb-4">
      <TeacherTabComponent />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NDivider } from 'naive-ui'
import TeacherSearchBar from './TeacherSearchBar.vue'
import TeacherTabComponent from './TeacherTabComponent.vue'
</script>

<style scoped>
:deep(.n-card) {
  background: rgba(34, 34, 34, 0.6) !important;
}

:deep(.n-divider .n-divider__line) {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  ) !important;
}
</style>
