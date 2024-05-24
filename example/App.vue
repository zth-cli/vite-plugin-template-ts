<script setup lang="ts">
import Remote from '@/components/Remote.vue'
import HelloWorld from '@/components/HelloWorld.vue'
const componentInfo = {
  js: 'http://localhost:3334/dist/my-plugin.umd.js',
  css: '',
  libraryName: 'myPlugin',
  componentName: 'MyButton',
}
</script>

<template>
  <div>
    <remote :component-info="componentInfo" />
  </div>
  <HelloWorld msg="Vite + Vue + TS" />
  <MyButton />
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
