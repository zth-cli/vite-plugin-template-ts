<script setup lang="ts">
import Remote from './components/Remote.vue'
import HelloWorld from '@/components/HelloWorld.vue'
const componentInfo = {
  js: 'http://localhost:3334/dist/TestButton/test-button.umd.js',
  css: '',
  libraryName: 'TestButton',
  componentName: 'MyButton',
}
</script>

<template>
  <HelloWorld msg="Vite + Vue + TS" />
  <br />
  <remote :component-info="componentInfo" label="远程加载的那妞" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
