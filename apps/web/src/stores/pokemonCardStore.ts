import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PokemonCard } from '../types/pokemonTypes'
import { getPokemonCards } from '../apis/pokemonCardApi'

export const usePokemonCardStore = defineStore('pokemonCardStore', () => {
  const pokemonCards = ref<PokemonCard[]>([])
  const currentPokemonCard = ref<PokemonCard>()
  const isPokemonModal = ref<boolean>(false)

  const searchPokemonCards = async () => {
    try {
      pokemonCards.value = await getPokemonCards()
      pokemonCards.value.sort(
        (card1, card2) => card1.pokedexId - card2.pokedexId,
      )
    } catch (err) {
      return null
    }
  }
  const getPokemonCard = (pokeCardId: number): PokemonCard | null => {
    const pokemonCard = pokemonCards.value.find(
      (pokemonCard) => pokemonCard.id === pokeCardId,
    )

    return pokemonCard || null
  }

  const selectPokemonCard = (pokemonCard: PokemonCard) => {
    currentPokemonCard.value = pokemonCard
    isPokemonModal.value = true
  }

  const unSelectPokemonCard = () => {
    isPokemonModal.value = false
  }

  return {
    pokemonCards,
    currentPokemonCard,
    isPokemonModal,
    searchPokemonCards,
    getPokemonCard,
    selectPokemonCard,
    unSelectPokemonCard,
  }
})
