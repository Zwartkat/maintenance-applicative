<script lang="ts" setup>
import { NConfigProvider, darkTheme } from 'naive-ui'
import HeaderMenu from './components/HeaderMenuComponent.vue'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <n-layout>
        <n-layout-header>
          <HeaderMenu />
        </n-layout-header>
        <n-layout-content class="content">
          <n-space justify="center">
            <n-message-provider>
              <RouterView />
            </n-message-provider>
          </n-space>
        </n-layout-content>
      </n-layout>
    </n-notification-provider>
  </n-config-provider>
</template>

<style>
.content {
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 3em;
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
