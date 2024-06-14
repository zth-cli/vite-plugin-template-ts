<template>
  <button class="lib-custom-button">{{ label }}</button>
</template>

<script lang="ts" setup>
export interface MyButtonProps {
  label: string
}
defineOptions({
  name: 'TestButton',
})
withDefaults(defineProps<MyButtonProps>(), {
  label: '远程按钮',
})
</script>
<style lang="scss">
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #eee;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
