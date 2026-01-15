<template>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePokemonCardStore } from '../stores/pokemonCardStore.ts'
import { storeToRefs } from 'pinia'

const pokemonCardsStore = usePokemonCardStore()
const { pokemonCards } = storeToRefs(pokemonCardsStore)

onMounted(async () => {
  await pokemonCardsStore.searchPokemonCards()
})
</script>

<style scoped></style>
