<template>
  <DeckBuilderComponent />
  <hr />
  <PokemonCardListComponent :pokemon-cards="pokemonCards" />
  <PokemonCardModalComponent :view="false" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import PokemonCardListComponent from '../components/PokemonCardListComponent.vue'
import { usePokemonCardStore } from '../stores/pokemonCardStore.ts'
import { storeToRefs } from 'pinia'
import PokemonCardModalComponent from '../components/PokemonCardModalComponent.vue'
import DeckBuilderComponent from '../components/DeckBuilderComponent.vue'

const pokemonCardsStore = usePokemonCardStore()
const { pokemonCards } = storeToRefs(pokemonCardsStore)

onMounted(async () => {
  await pokemonCardsStore.searchPokemonCards()
})
</script>

<style scoped></style>
