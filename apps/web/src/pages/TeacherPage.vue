<template>
  <div class="teacher-page" @mousemove="handleMouseMove">
    <vue-particles
      id="tsparticles"
      class="particles-bg"
      :options="particlesOptions"
    />
    <div class="content-wrapper">
      <TeacherSearchBar />
      <TeacherTabComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TeacherCardComponent from '@/components/TeacherCardComponent.vue'
import TeacherSearchBar from '@/components/TeacherSearchBar.vue'
import TeacherTabComponent from '@/components/TeacherTabComponent.vue'

const cursorX = ref(0)
const cursorY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const particlesOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: '#ffffff',
    },
    move: {
      direction: 'bottom' as const,
      enable: true,
      outModes: {
        default: 'out' as const,
      },
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: { min: 0.3, max: 0.8 },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 4 },
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 10,
    },
  },
  detectRetina: true,
}
</script>

<style scoped>
.teacher-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.cursor-light {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(66, 184, 131, 0.15) 0%,
    rgba(66, 184, 131, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.content-wrapper {
  position: relative;
  z-index: 2;
}
</style>