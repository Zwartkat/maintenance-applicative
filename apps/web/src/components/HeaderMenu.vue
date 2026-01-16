<template>
  <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div class="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-2 border border-white/10">
      <button
        v-for="item in menuItems"
        :key="item.key"
        @click="item.onClick"
        class="menu-btn px-6 py-2 rounded-full text-white/80 font-medium transition-all duration-300 hover:bg-green-500/20 hover:text-green-400 hover:shadow-[0_0_20px_rgba(66,184,131,0.3)]"
        :class="{ 'bg-green-500/20 text-green-400': isActive(item.path) }"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  {
    label: 'Accueil',
    key: 'home',
    path: '/',
    onClick: () => router.push('/'),
  },
  {
    label: 'Teachers',
    key: 'teachers',
    path: '/teachers',
    onClick: () => router.push('/teachers'),
  },
  {
    label: 'Login',
    key: 'login',
    path: '/login',
    onClick: () => router.push('/login'),
  },
]

const isActive = (path: string) => route.path === path
</script>

<style scoped>
.menu-btn:active {
  transform: scale(0.95);
}
</style>
