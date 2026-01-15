export type PokemonCard = {
  id: number
  name: string
  pokedexId: number
  type: Type
  lifePoints: number
  size: number
  weight: number
  imageUrl: string
  rarity: Rarity
  weakness: Type
}

export type Type = {
  id: number
  name: string
  icone: string
}

export type Rarity = {
  id: number
  name: string
  icone: string
}
