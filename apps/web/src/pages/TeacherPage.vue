<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <!-- Floating circles -->
      <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-green-500/10 to-green-600/5 animate-float-slow"></div>
      <div class="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-bl from-green-400/15 to-emerald-500/8 animate-float-medium"></div>
      <div class="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-green-600/8 to-green-500/12 animate-float-fast"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-gradient-to-tl from-emerald-500/10 to-green-400/6 animate-float-slow"></div>
      
      <!-- Geometric shapes -->
      <div class="absolute top-60 left-1/4 w-16 h-16 rotate-45 bg-gradient-to-br from-green-500/20 to-transparent animate-pulse-slow"></div>
      <div class="absolute bottom-60 right-1/4 w-20 h-20 rotate-12 bg-gradient-to-tl from-emerald-400/15 to-transparent animate-spin-slow"></div>
      
      <!-- Grid overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_70%)]"></div>
    </div>

    <!-- Compact Header -->
    <section class="relative z-10 pt-6 pb-2 px-8 text-center bg-gradient-to-b from-black/50 via-black/30 to-transparent">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0 leading-tight tracking-tight">
          <span class="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            Classement
          </span> 
          des Enseignants
        </h1>
      </div>
    </section>

    <!-- Search and Content Section -->
    <section class="relative z-10 px-8 pb-16">
      <div class="max-w-5xl mx-auto">
        <div class="flex justify-center mb-6">
          <TeacherSearchBar />
        </div>
        
        <div class="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl shadow-black/50 overflow-hidden">
          <!-- Subtle inner glow -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] rounded-3xl pointer-events-none"></div>
          <div class="absolute -inset-0.5 bg-gradient-to-r from-white/5 via-white/2 to-white/3 rounded-3xl blur-sm opacity-30 -z-10"></div>
          
          <div class="relative z-10">
            <TeacherTabComponent />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import TeacherSearchBar from '@/components/TeacherSearchBar.vue'
import TeacherTabComponent from '@/components/TeacherTabComponent.vue'
</script>

<style scoped>
/* Custom animations for background elements */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translateY(-15px) translateX(10px) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(-25px) translateX(-5px) scale(0.9);
    opacity: 0.7;
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-10px) rotate(90deg) scale(1.05);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-30px) rotate(180deg) scale(0.95);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-15px) rotate(270deg) scale(1.1);
    opacity: 0.6;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.2;
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 5s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast {
    animation-duration: 12s, 8s, 6s;
  }
}
</style>