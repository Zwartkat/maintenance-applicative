<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NIcon } from 'naive-ui'
import { SchoolOutline, TrophyOutline, PeopleOutline } from '@vicons/ionicons5'

const router = useRouter()
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center px-4 pt-16">
    <!-- Hero Section -->
    <div 
      class="text-center transition-all duration-700 transform"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
        <span class="text-green-400">Teacher</span> Ranking
      </h1>
      <p class="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
        Votez pour vos professeurs d'animés préférés et découvrez le classement en temps réel
      </p>
      
      <n-button 
        type="primary" 
        size="large" 
        round
        class="!bg-green-500 !border-green-500 hover:!bg-green-600 !px-8 !py-6 !text-lg"
        @click="router.push('/teachers')"
      >
        Voir le classement
      </n-button>
    </div>

    <!-- Features Section -->
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full transition-all duration-700 delay-300"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <div class="feature-card">
        <div class="icon-wrapper">
          <n-icon :component="SchoolOutline" size="32" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Tous les profs</h3>
        <p class="text-white/50 text-sm">Retrouvez des professeurs d'animés'</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <n-icon :component="TrophyOutline" size="32" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Classement live</h3>
        <p class="text-white/50 text-sm">Suivez le classement en temps réel</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <n-icon :component="PeopleOutline" size="32" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Votez</h3>
        <p class="text-white/50 text-sm">Upvote ou downvote vos professeurs préférés</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(66, 184, 131, 0.3);
  box-shadow: 0 0 30px rgba(66, 184, 131, 0.1);
}

.icon-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  border-radius: 9999px;
  background: rgba(66, 184, 131, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(74, 222, 128);
}
</style>
