<script setup>
import { RouterView } from 'vue-router'
import MenuLateral from './components/MenuLateral.vue'
</script>

<template>
  <div :class="{ 'app-layout': $route.path !== '/' }">
    <MenuLateral v-if="$route.path !== '/'" />

    <main class="content-area">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
}

.content-area {
  padding: 20px;
  overflow-y: auto;
  min-width: 0;
}
</style>