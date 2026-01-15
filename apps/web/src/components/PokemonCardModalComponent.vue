<template>
  <n-modal
    v-model:show="isPokemonModal"
    :title="currentPokemonCard?.name"
    @on-ok="handleClose"
    @on-cancel="handleClose"
  >
    <div class="current-card">
      <n-image
        v-bind:src="currentPokemonCard?.imageUrl"
        class="card-img"
        :style="{ maxWidth: '100%', filter: 'blur(40px)' }"
      />
      <n-card
        :title="currentPokemonCard?.name"
        :header-style="{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
        }"
      >
        <n-space vertical>
          <n-space align="center" justify="space-between">
            <div class="stat">
              <span class="label">PV : </span>
              <span class="value">{{ currentPokemonCard?.lifePoints }}</span>
            </div>
            <div class="stat">
              <span class="label">Type : </span>
              <img v-bind:src="currentPokemonCard?.type.icone" class="icone" />
            </div>
            <div class="stat">
              <span class="label">Rareté : </span>
              <span class="value">{{
                ` ${currentPokemonCard?.rarity.name} ${currentPokemonCard?.rarity.icone}`
              }}</span>
            </div>
          </n-space>

          <n-divider />

          <n-space justify="space-around">
            <div class="stat">
              <span class="label">Poids : </span>
              <span class="value">{{ currentPokemonCard?.weight }} kg</span>
            </div>
            <div class="stat">
              <span class="label">Taille : </span>
              <span class="value">{{ currentPokemonCard?.size }} m</span>
            </div>
          </n-space>

          <n-divider />

          <n-space
            v-if="currentPokemonCard?.weakness"
            align="center"
            justify="center"
          >
            <div class="stat">
              <span class="label">Faiblesse : </span>
              <img
                v-bind:src="currentPokemonCard?.weakness.icone"
                class="icone"
              />
            </div>
          </n-space>
          <div v-if="props.view === false" class="card-content">
            <n-button type="info" @click.stop="handleAdd">Ajouter</n-button>
            <n-button type="error" @click.stop="handleDelete">Enlever</n-button>
          </div>
        </n-space>
      </n-card>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePokemonCardStore } from '../stores/pokemonCardStore'
import { useDeckStore } from '../stores/deckStore'
import { useNotification } from 'naive-ui'

const pokemonCardStore = usePokemonCardStore()
const deckStore = useDeckStore()

const notification = useNotification()

const { isPokemonModal, currentPokemonCard } = storeToRefs(pokemonCardStore)
const { buildingDeckCards } = storeToRefs(deckStore)

const props = defineProps({
  view: {
    type: Boolean,
    required: true,
  },
})

const handleClose = () => {
  pokemonCardStore.unSelectPokemonCard()
}

function handleAdd() {
  deckStore.addCard(currentPokemonCard.value!)
  notification.success({
    title: 'Carte ajoutée',
    content: `La carte ${currentPokemonCard.value?.name} a été ajoutée au deck`,
    duration: 3000,
  })
}

function handleDelete() {
  if (buildingDeckCards.value.includes(currentPokemonCard.value!)) {
    deckStore.deleteCard(currentPokemonCard.value!)
    notification.info({
      title: 'Carte retirée',
      content: `La carte ${currentPokemonCard.value?.name} a été retirée du deck`,
      duration: 3000,
    })
  } else {
    notification.error({
      title: 'Impossible de retirer la carte',
      content: "Cette carte n'est pas présente dans le deck en construction ",
      duration: 3000,
    })
  }
}
</script>

<style scoped>
.content-segment {
  border-top: solid 1px #333333;
}

.icone {
  width: 20px;
  height: auto;
}

.stat {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}
.stat .label {
  font-weight: bold;
}

@media (max-width: 768px) {
  .current-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .card-img :deep(img) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .current-card {
    display: flex;
    flex-direction: row;
    width: 50%;
    height: 70vh;
    border-radius: 15px;
    background-color: #333333;
  }
}
</style>
