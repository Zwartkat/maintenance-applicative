<template>
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

    <n-form-item
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="Re-enter Password"
    >
      <n-input
        v-model:value="modelRef.reenteredPassword"
        :disabled="!modelRef.password"
        type="password"
      />
    </n-form-item>

    <div style="display: flex; justify-content: center">
      <n-button
        :disabled="modelRef.email === null"
        ghost
        block
        type="primary"
        @click="handleRegister"
      >
        S'inscrire
      </n-button>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { ref } from 'vue'
import type { IUserRegister } from '../types/userTypes'
import { useUserStore } from '../stores/userStore'
import { useNotification } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const modelRef = ref<IUserRegister>({
  email: null,
  password: null,
  reenteredPassword: null,
})

const notification = useNotification()

const userStore = useUserStore()

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
  reenteredPassword: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: 'Password is not same as re-entered password!',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: 'Password is not same as re-entered password!',
      trigger: ['blur', 'password-input'],
    },
  ],
}

function validatePasswordStartWith(
  _rule: FormItemRule,
  value: string,
): boolean {
  return (
    !!modelRef.value.password &&
    modelRef.value.password.startsWith(value) &&
    modelRef.value.password.length >= value.length
  )
}
function validatePasswordSame(): boolean {
  return modelRef.value.reenteredPassword === modelRef.value.password
}

const handleRegister = () => {
  if (modelRef.value.email && modelRef.value.password) {
    if (validatePasswordSame()) {
      userStore.register({
        email: modelRef.value.email,
        password: modelRef.value.password,
      })
      notification.success({
        title: 'Succès',
        content: 'Inscription réussie',
      })
    }
  }
}
</script>
