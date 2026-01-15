<template>
  <n-notification-provider>
    <n-form ref="formRef" :model="modelRef" :rules="rules">
      <n-form-item path="email" label="Email">
        <n-input
          v-model:value="modelRef.email"
          type="email"
          required
          placeholder="Enter an email"
        />
      </n-form-item>

      <n-form-item path="password" label="Password">
        <n-input
          v-model:value="modelRef.password"
          type="password"
          placeholder="Enter a password"
        />
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: center">
            <n-button
              :disabled="modelRef.email === null"
              ghost
              block
              type="primary"
              @click="handleLogin"
            >
              Se connecter
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-notification-provider>
</template>

<script lang="ts" setup>
import type {
  FormInst,
  FormItemRule,
  FormRules,
  NNotificationProvider,
} from 'naive-ui'
import { ref } from 'vue'
import type { IUserPayload } from '../types/userTypes'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'

const router = useRouter()

const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const modelRef = ref<IUserPayload>({
  email: null,
  password: null,
})
const notification = useNotification()

const rules: FormRules = {
  age: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Email is required')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
    },
  ],
}

const handleLogin = async () => {
    router.push('/deck-builder')
  /*const token = await userStore.login({
    email: modelRef.value.email,
    password: modelRef.value.password,
  })
  if (localStorage.getItem('token') !== null) {
    notification.success({
      title: 'Succès',
      content: 'Connexion réussie',
      duration: 3000,
    })
    router.push('/deck-builder')
  } else {
    notification.error({
      title: 'Erreur',
      content: 'Impossible de se connecter',
      duration: 3000,
    })
  }*/
}
</script>
<style>
.login-btn {
  width: 10rem;
}
</style>
