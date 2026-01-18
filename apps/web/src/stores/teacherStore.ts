import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Teacher, VoteType } from '../types/teacherTypes'
import { getTeachers, voteForTeacher } from '../apis/teacherApi'

// Fonction pour normaliser le texte (enlever les accents)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export const useTeacherStore = defineStore('teacherStore', () => {
  const teachers = ref<Teacher[]>([])
  const currentTeacher = ref<Teacher>()
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const searchQuery = ref<string>('')

  // Filtrer les professeurs selon la recherche
  const filteredTeachers = computed(() => {
    if (!searchQuery.value.trim()) {
      return teachers.value
    }

    const normalizedQuery = normalizeText(searchQuery.value.trim())
    const queryTerms = normalizedQuery.split(/\s+/)

    return teachers.value.filter((teacher) => {
      const normalizedFirstName = normalizeText(teacher.firstName)
      const normalizedLastName = normalizeText(teacher.lastName)
      const fullName = `${normalizedFirstName} ${normalizedLastName}`
      const reversedFullName = `${normalizedLastName} ${normalizedFirstName}`

      // Vérifie si tous les termes de recherche correspondent
      return queryTerms.every((term) => fullName.includes(term) || reversedFullName.includes(term))
    })
  })

  const fetchTeachers = async () => {
    isLoading.value = true
    error.value = null
    try {
      teachers.value = await getTeachers()
    } catch (err) {
      error.value = `Erreur lors de la récupération des professeurs : ${err}`
      return null
    } finally {
      isLoading.value = false
    }
  }

  const getTeacherById = (teacherId: number): Teacher | null => {
    const teacher = teachers.value.find((teacher) => teacher.id === teacherId)
    return teacher || null
  }

  const selectTeacher = (teacher: Teacher) => {
    currentTeacher.value = teacher
  }

  const vote = async (teacherId: number, voteType: boolean, userId: number) => {
    try {
      await voteForTeacher(teacherId, voteType, userId)
      return true
    } catch (err) {
      error.value = `Erreur lors du vote ${err}`
      return false
    }
  }

  return {
    teachers,
    filteredTeachers,
    searchQuery,
    currentTeacher,
    isLoading,
    error,
    fetchTeachers,
    getTeacherById,
    selectTeacher,
    vote,
  }
})
