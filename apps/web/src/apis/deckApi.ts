import axios from 'axios'
import type { Deck, DeckInput } from '../types/deckTypes'

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

export const postDeck = async (deck: DeckInput) => {
  const response = await api.post('/decks', deck)
  return response.data
}

export const getDecks = async () => {
  const response = await api.get('/decks')
  return response.data
}

export const deleteDeck = async (deck: Deck) => {
  const response = await api.delete(`/decks/${deck.id}`)
  return response.status
}
