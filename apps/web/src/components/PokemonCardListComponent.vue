<template>
  <CardCarouselComponent />
  <n-divider />
  <n-input
    v-model:value="searchInput"
    placeholder="Rechercher"
    style="
      flex: 1;
      height: 3rem;
      line-height: 3rem;
      padding: 0 12px;
      border-radius: 8px;
      border: 1px solid #4caf50;
      background-color: #f7f7f7;
      transition: all 0.3s ease;
    "
  />
  <n-divider />

  <n-grid v-if="pokemonCards.length > 0" :x-gap="50" :y-gap="8" :cols="5">
    <n-grid-item v-for="pokemonCard in pokemonCards" :key="pokemonCard.id">
      <PokemonCardComponent
        :pokemon-card="pokemonCard"
        action="add"
        class="pokemon-card"
      />
    </n-grid-item>
  </n-grid>
  <p v-else style="text-align: center; color: #888">Aucun résultat</p>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PokemonCard } from '../types/pokemonTypes'
import CardCarouselComponent from './CardCarouselComponent.vue'

const props = defineProps({
  pokemonCards: {
    type: Array as () => PokemonCard[],
    required: true,
  },
})

const searchInput = ref<string>('')

const pokemonCards = computed(() => {
  return props.pokemonCards.filter((pokemonCard) =>
    pokemonCard.name
      .toLocaleLowerCase()
      .startsWith(searchInput.value.toLocaleLowerCase()),
  )
})
</script>

<style scoped>
.n-grid {
  padding: 5px;
}

.n-carousel {
  height: auto;
}
</style>
