import { defineStore } from 'pinia'
import type { IUserPayload } from '../types/userTypes'
import { loginUser, postUser } from '../apis/userApi'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>('')
  const userId = ref<number>()
  const object = ref<any>()

  const register = async (userPayload: IUserPayload) => {
    try {
      await postUser(userPayload)
    } catch (err) {
      console.log(err)
    }
  }

  const login = async (userPayload: IUserPayload) => {
    try {
      const { userData, status } = await loginUser(userPayload)
      object.value = { userData, status }
      if (status != 200) {
        return false
      }

      if (userData['token']) token.value = userData['token']

      localStorage.setItem('token', token.value)

      return true
    } catch (err) {
      return false
    }
  }

  const checkToken = (localToken: string) => {
    if (token.value == localToken) return true
    return false
  }

  return { register, login, checkToken }
})
