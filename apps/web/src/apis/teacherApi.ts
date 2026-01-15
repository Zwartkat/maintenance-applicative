import axios from 'axios'
import type { Teacher } from '../types/teacherTypes'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get('/teachers')
  return response.data
}

export const voteForTeacher = async (
  teacherId: number,
  voteType: boolean,
  userId: number
): Promise<{ status: number }> => {
  const response = await api.post(`/vote?teacher=${teacherId}&vote=${voteType ? 'true' : 'false'}&user=${userId}`)
  console.log(response)
  return response.data
}
