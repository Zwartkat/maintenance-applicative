export type Deck = {
  id: number
  name: string
  ownerId: number
  composition: DeckComposition[]
}

export type DeckInput = {
  name: string
  ownerId: number
  composition: DeckCompositionInput[]
}

export type DeckComposition = {
  deckId: number
  quantity: number
  pokeCardId: number
}

export type DeckCompositionInput = {
  quantity: number
  pokeCardId: number
}
