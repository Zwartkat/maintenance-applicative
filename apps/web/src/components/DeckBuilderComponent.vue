<template>
  <n-space vertical align="center" class="space-container">
    <n-space align="center" :gap="20" class="space-input-button">
      <n-input
        v-model:value="deckName"
        placeholder="Nom du deck"
        class="input-field"
      />
      <n-button @click="saveDeck" type="success" class="save-button">
        Sauvegarder
      </n-button>
    </n-space>
    <p class="card-count">Nombre de cartes: {{ buildingDeckCards.length }}</p>
    <n-grid cols="8" x-gap="12" y-gap="12" class="grid-container">
      <n-grid-item
        v-for="pokemonCard in buildingDeckCards"
        :key="pokemonCard.id"
        class="grid-item"
      >
        <PokemonCardComponent
          :pokemon-card="pokemonCard"
          action="delete"
          class="pokemon-card"
        />
      </n-grid-item>
    </n-grid>
    <p v-if="buildingDeckCards.length === 0" class="empty-deck-message">
      Aucune carte dans le deck
    </p>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeckStore } from '../stores/deckStore'
import { ref } from 'vue'
import { useNotification } from 'naive-ui'

const deckStore = useDeckStore()
const { buildingDeckCards } = storeToRefs(deckStore)
const deckName = ref<string>('')

const notification = useNotification()

function saveDeck() {
  if (buildingDeckCards.value.length < 2) {
    notification.error({
      title: 'Echec de sauvegarde',
      description: 'Le deck doit posséder au moins 2 cartes',
      duration: 6000,
    })
    return
  } else if (deckName.value === '') {
    notification.error({
      title: 'Echec de sauvegarde',
      description: 'Vous devez renseigner un nom de deck',
      duration: 6000,
    })
    return
  }
  deckStore.saveDeck(deckName.value)
}
</script>

<style scoped>
.space-container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.space-input-button {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.input-field {
  flex: 1;
  height: 3rem;
  line-height: 3rem;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.save-button {
  height: 3rem;
  padding: 0 16px;
  border-radius: 8px;
  font-weight: 600;
}

.card-count {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
}

.grid-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.grid-item {
  display: flex;
  justify-content: center;
}

.empty-deck-message {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}

.pokemon-card {
  width: 100%;
  max-width: 200px;
}
</style>
