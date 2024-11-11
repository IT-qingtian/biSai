<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheFooter,
    TheHeader
  }
})
</script>

<template>
  <div class="outer-container">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<style>
:root {
  --bg-white: #ffffff;
  --text-color: #000000;
  --text-light: #333333;
  --border-color: #e5e5e5;
}
</style>

<style scoped>
.outer-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-white);
}
</style>
