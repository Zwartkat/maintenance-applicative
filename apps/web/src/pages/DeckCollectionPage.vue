<template>
  <h1>Liste des decks</h1>
  <DeckListComponent />
  <DeckViewerComponent />
  <PokemonCardModalComponent :view="true" />
</template>

<script lang="ts" setup>
import DeckListComponent from '../components/DeckListComponent.vue'
</script>

<style scoped></style>
