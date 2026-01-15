import { createRouter, createWebHistory } from 'vue-router'
import DeckCollectionPage from './pages/DeckCollectionPage.vue'
import DeckBuilder from './pages/DeckBuilderPage.vue'
import LoginFormPage from './pages/LoginFormPage.vue'
import { useUserStore } from './stores/userStore'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView, meta: {requireAuth : true} },
  {
    path: '/deck-builder',
    component: DeckBuilder,
    meta: { requireAuth: true },
  },
  {
    path: '/deck-collection',
    component: DeckCollectionPage,
    meta: { requireAuth: true },
  },
  { path: '/login', component: LoginFormPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const token = localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!token || !userStore.checkToken(token)) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
