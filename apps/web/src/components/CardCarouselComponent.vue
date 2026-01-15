<template>
  <n-carousel
    :loop="true"
    slides-per-view="auto"
    draggable
    autoplay
    interval="2000"
  >
    <n-carousel-item style="width: 20%" v-for="pokemonCard in pokemonCards">
      <PokemonCardComponent
        :pokemon-card="pokemonCard"
        action="none"
        class="pokemon-card"
      />
    </n-carousel-item>
  </n-carousel>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePokemonCardStore } from '../stores/pokemonCardStore'

const pokemonCardStore = usePokemonCardStore()

const { pokemonCards } = storeToRefs(pokemonCardStore)
</script>
