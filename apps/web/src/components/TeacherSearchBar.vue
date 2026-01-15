<template>
  <div class="max-w-4xl mx-auto px-4">
    <n-input
      v-model:value="searchQuery"
      placeholder="Rechercher un professeur (nom ou prénom)..."
      clearable
      size="large"
    >
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NInput, NIcon } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { useTeacherStore } from '../stores/teacherStore'
import { storeToRefs } from 'pinia'

const teacherStore = useTeacherStore()
const { searchQuery } = storeToRefs(teacherStore)
</script>
