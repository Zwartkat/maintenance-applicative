<template>
  <n-card class="card" @click="handleClick" hoverable>
    <template #cover>
      <img class="card-cover" v-bind:src="pokemonCard.imageUrl" />
    </template>
    <div v-if="action !== 'none'" class="card-content">
      <n-button v-if="action === 'add'" type="info" @click.stop="handleAdd"
        >Ajouter</n-button
      >
      <n-button
        v-if="action === 'delete'"
        type="error"
        @click.stop="handleDelete"
        >Enlever</n-button
      >
    </div>
  </n-card>
</template>
<script setup lang="ts">
import type { PokemonCard } from '../types/pokemonTypes'
import { usePokemonCardStore } from '../stores/pokemonCardStore'
import { useDeckStore } from '../stores/deckStore'
import { useNotification } from 'naive-ui'

type PokemonCardProps = {
  pokemonCard: PokemonCard
  action: 'add' | 'delete' | 'none'
}

const notification = useNotification()

const props = defineProps<PokemonCardProps>()
const pokemonCard = props.pokemonCard
const action = props.action

const pokemonCardStore = usePokemonCardStore()
const deckStore = useDeckStore()

function handleClick() {
  pokemonCardStore.selectPokemonCard(pokemonCard)
}

function handleAdd() {
  deckStore.addCard(pokemonCard)
  notification.success({
    title: 'Carte ajoutée',
    content: `La carte ${pokemonCard.name} a été ajoutée au deck`,
    duration: 3000,
  })
}

function handleDelete() {
  deckStore.deleteCard(pokemonCard)
}
</script>

<style>
.card {
  border-radius: 15px;
  transition: all 1s;
}

.card::hover {
  transform: scale(0.95);
}

.card-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
}

.card-content .n-button {
  width: 100%;
}

.card-cover {
  cursor: pointer;
  width: 95%;
  filter: blur(40px)
}
</style>
