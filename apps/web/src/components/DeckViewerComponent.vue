<template>
  <n-modal
    v-model:show="isDeckModal"
    :title="currentDeck?.name"
    @on-cancel="handleClose"
    class="custom-modal"
  >
    <n-card>
      <h1 class="deck-title">
        Détails du deck :
        {{ currentDeck !== null ? currentDeck?.name : 'Aucun nom' }}
      </h1>
      <n-grid cols="5" x-gap="12" y-gap="12">
        <n-grid-item v-for="pokemonCard in currentDeckCards">
          <PokemonCardComponent
            :key="pokemonCard.id"
            :pokemon-card="pokemonCard"
            action="none"
            class="pokemon-card"
          />
        </n-grid-item>
      </n-grid>
    </n-card>
  </n-modal>
</template>

<style scoped>
.custom-modal {
  width: 80%;
  max-width: 1000px;
}

.deck-title {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-card {
  margin: 10px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeckStore } from '../stores/deckStore'

const deckStore = useDeckStore()

const { isDeckModal, currentDeck, currentDeckCards } = storeToRefs(deckStore)

function handleClose() {
  isDeckModal.value = false
}
</script>
