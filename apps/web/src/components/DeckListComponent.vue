<template>
  <n-space vertical>
    <n-list bordered>
      <n-list-item v-for="deck in userDecks" :key="deck.id" class="deck-item">
        <n-space justify="space-between" align="center" style="width: 100%">
          <div>
            <h2 v-if="deck.name !== ''">{{ deck.name }}</h2>
            <h2 v-else>Aucun nom</h2>
            <p style="margin-top: 4px">Deck ID: {{ deck.id }}</p>
          </div>
          <div>
            <n-button
              @click="selectDeck(deck)"
              type="primary"
              size="small"
              style="margin-right: 8px"
              >Détails</n-button
            >
            <n-button @click="openDeleteModal(deck)" type="error" size="small"
              >Supprimer</n-button
            >
          </div>
        </n-space>
      </n-list-item>
    </n-list>
    <p v-if="userDecks?.length === 0" style="text-align: center; color: #888">
      Aucun deck trouvé
    </p>
  </n-space>

  <n-modal
    v-model:show="deleteModal"
    @on-ok="deleteDeck"
    @on-cancel="closeDeleteModal"
  >
    <n-card title="Suppression de deck">
      <p>Voulez-vous vraiment supprimer ce deck ?</p>
      <template #action>
        <n-button @click="closeDeleteModal" style="margin-right: 8px"
          >Annuler</n-button
        >
        <n-button type="error" @click="deleteDeck">Supprimer</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDeckStore } from '../stores/deckStore'
import { storeToRefs } from 'pinia'
import type { Deck } from '../types/deckTypes'
import { useNotification } from 'naive-ui'

const notification = useNotification()

const deckStore = useDeckStore()

const { userDecks, isDeckModal } = storeToRefs(deckStore)
const { setCurrentDeck, removeDeck } = deckStore

const deleteModal = ref<boolean>(false)
const deckToDelete = ref<Deck | null>(null)

onMounted(() => {
  deckStore.getDeckList()
})

function selectDeck(deck: Deck) {
  isDeckModal.value = true
  setCurrentDeck(deck)
}

function openDeleteModal(deck: Deck) {
  deckToDelete.value = deck
  deleteModal.value = true
}

function closeDeleteModal() {
  deleteModal.value = false
  deckToDelete.value = null
}

function deleteDeck() {
  if (deckToDelete.value) {
    notification.success({
      title: 'Deck supprimé',
      description: `Vous venez de supprimer le deck ${deckToDelete.value.name}`,
      duration: 6000,
    })
    removeDeck(deckToDelete.value)
    closeDeleteModal()
  }
}
</script>
<style scoped>
.deck-item {
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.deck-item:hover {
  background-color: #e0e0e0;
}

.n-button {
  margin: 0 4px;
}

.n-list {
  max-width: 600px;
  margin: 20px auto;
}

p {
  font-size: 14px;
}

.n-modal {
  border-radius: 12px;
  width: 30%;
}
</style>
