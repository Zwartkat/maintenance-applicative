<template>
  <n-card class="login-card">
    <n-tabs type="line" animated>
      <n-tab-pane name="login" tab="Connexion">
        <LoginFormComponent />
      </n-tab-pane>
      <n-tab-pane name="register" tab="Inscription">
        <RegisterFormComponent />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import LoginFormComponent from '@/components/LoginFormComponent.vue';
import RegisterFormComponent from '@/components/RegisterFormComponent.vue';

</script>

<style scoped>
.login-card {
  box-shadow: 0px 0px 5px black;
  margin: 3rem 0 3rem 0;
  color: black;
}
</style>
