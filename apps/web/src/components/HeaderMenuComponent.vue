<template>
  <header class="header-menu">
    <nav class="nav-container">
      <button
        v-for="item in menuItems"
        :key="item.key"
        class="nav-button"
        @click="item.onClick"
      >
        {{ item.label }}
      </button>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = computed(() => [
  {
    label: 'Accueil',
    key: 'home',
    onClick: () => {
      router.push('/')
    },
  },
  {
    label: 'Classement',
    key: 'teachers-classement',
    onClick: () => {
      router.push('/teachers')
    },
  },
  {
    label: 'Login',
    key: 'login',
    onClick: () => {
      router.push('/login')
    },
  },
])
</script>

<style scoped>
.header-menu {
  width: 100%;
  background: transparent;
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nav-button {
  background: rgba(76, 75, 75, 0.1);
  color: rgb(255, 255, 255);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.nav-button:hover {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.nav-button:active {
  transform: translateY(0);
}
</style>
