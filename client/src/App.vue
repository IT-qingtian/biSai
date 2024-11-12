<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="app-container">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(74, 144, 226, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(74, 144, 226, 0.5);
}

/* Firefox 滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(74, 144, 226, 0.3) #f1f1f1;
}

/* Element Plus 滚动条样式覆盖 */
.el-scrollbar__bar.is-vertical {
  width: 8px !important;
}

.el-scrollbar__thumb {
  background-color: rgba(74, 144, 226, 0.3) !important;
  border-radius: 4px !important;
}

.el-scrollbar__thumb:hover {
  background-color: rgba(74, 144, 226, 0.5) !important;
}

body {
  padding: 0;
  margin: 0;
}

/* 自定义属性 header高度是70px */
:root {
  --header-height: 70px;
}
</style>