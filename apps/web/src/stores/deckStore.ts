import { defineStore, storeToRefs } from 'pinia'
import type { Deck, DeckInput } from '../types/deckTypes'
import { ref } from 'vue'
import type { PokemonCard } from '../types/pokemonTypes'
import { usePokemonCardStore } from './pokemonCardStore'
import { getDecks, postDeck, deleteDeck } from '../apis/deckApi'

export const useDeckStore = defineStore('deckStore', () => {
  const pokemonCardStore = usePokemonCardStore()
  const { getPokemonCard } = pokemonCardStore

  const currentDeck = ref<Deck>()
  const isDeckModal = ref<boolean>(false)

  const userDecks = ref<Deck[]>([])
  const buildingDeck = ref<DeckInput>({
    ownerId: Number.parseInt(sessionStorage.getItem('user')!),
    name: 'Aucun nom',
    composition: [],
  })
  const buildingDeckCards = ref<PokemonCard[]>([])
  const currentDeckCards = ref<PokemonCard[]>([])

  const getDeckList = async () => {
    const userId = Number(localStorage.getItem("user"));
    userDecks.value = await getDecks();
    userDecks.value = userDecks.value.filter((deck) => deck.ownerId === userId);
  };

  const addCard = (pokemonCard: PokemonCard) => {
    buildingDeckCards.value.push(pokemonCard)
    buildingDeckCards.value.sort(
      (card1, card2) => card1.pokedexId - card2.pokedexId,
    )
  }

  const deleteCard = (pokemonCard: PokemonCard) => {
    const index = buildingDeckCards.value.findIndex(
      (card) => card.id === pokemonCard.id,
    )
    buildingDeckCards.value.splice(index, 1)
  }

  const _buildComposition = () => {
    let composition: { [key: number]: number } = {}

    buildingDeckCards.value.forEach((card: PokemonCard) => {
      if (composition[card.id]) {
        composition[card.id] += 1
      } else {
        composition[card.id] = 1
      }
    })

    buildingDeck.value.composition = []

    for (const id in composition) {
      buildingDeck.value.composition.push({
        pokeCardId: Number.parseInt(id),
        quantity: composition[id],
      })
    }
  }

  const saveDeck = (deckName: string) => {
    if (buildingDeck.value.name !== '') buildingDeck.value.name = deckName
    _buildComposition()
    postDeck(buildingDeck.value)
    buildingDeckCards.value = []
  }

  const setCurrentDeck = (deck: Deck) => {
    currentDeck.value = deck
    _setCurrentCardDeck()
  }

  const _setCurrentCardDeck = () => {
    currentDeckCards.value = []
    currentDeck.value?.composition.forEach((composition) => {
      const pokemonCard = getPokemonCard(composition.pokeCardId)
      if (pokemonCard != null) {
        for (let i = 0; i < composition.quantity; i++) {
          currentDeckCards.value.push(pokemonCard)
        }
      }
    })
  }

  const removeDeck = async (deck: Deck) => {
    const index = userDecks.value.findIndex(
      (userDeck) => userDeck.id === deck.id,
    )
    userDecks.value.splice(index, 1)
    return await deleteDeck(deck)
  }

  return {
    buildingDeck,
    buildingDeckCards,
    userDecks,
    isDeckModal,
    currentDeck,
    currentDeckCards,
    addCard,
    deleteCard,
    saveDeck,
    getDeckList,
    setCurrentDeck,
    removeDeck,
  }
})
