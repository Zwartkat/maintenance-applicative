import './main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import naive from 'naive-ui'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(naive)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  },
})
app.mount('#app')
