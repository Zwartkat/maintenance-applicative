import axios from 'axios'
import type { IUserPayload } from '../types/userTypes'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
export const postUser = async (userPayload: IUserPayload) => {
  const response = await api.post('/users', userPayload)
  return response.data
}

export const loginUser = async (userPayload: IUserPayload) => {
  const response = await api.post('/users/login', userPayload)
  return {
    userData: response.data,
    status: response.status,
  }
}
