<template>
  <component :is="mode" v-bind="$attrs"></component>
</template>

<script lang="ts">
import { markRaw, onMounted, ref, toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'Remote',
  // 如果你不希望组件的根元素继承特性，你可以在组件的选项中设置inheritAttrs: falseinheritAttrs: false,
  props: {
    componentInfo: {
      type: Object,
      default() {
        return {
          js: '',
          css: '',
          libraryName: '',
          componentName: '',
        }
      },
    },
  },
  setup(props) {
    const mode = ref()
    const { js, libraryName, componentName } = toRefs(props.componentInfo)
    /**
     * 使用动态 script方式加载远程js
     */
    function asyncScript(url: string) {
      // 动态script
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        const target = document.getElementsByTagName('script')[0] || document.head
        script.type = 'text/javascript'
        script.src = url
        script.onload = resolve
        script.onerror = reject
        target.parentNode?.appendChild(script)
      })
    }

    /**
     * 加载js
     * @param url js文件地址
     * @param libraryName 库名
     * @param componentName 组件名
     * @return {Promise<void>}
     */
    async function loadScript(
      url: string,
      libraryName: number,
      componentName: number,
    ): Promise<void> {
      // 动态script
      await asyncScript(url)
      console.log(window[libraryName])
      mode.value = markRaw(window[libraryName]?.[componentName])
      // mode.value = markRaw(window[libraryName].default[componentName]);
    }

    /**
     * 加载样式
     * @param url css样式文件地址
     */
    function loadStyles(url: string) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = url
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(link)
    }

    onMounted(() => {
      // 加载css
      // loadStyles(css.value)
      // 加载js
      loadScript(js.value, libraryName.value, componentName.value)
    })
    return {
      mode,
    }
  },
})
</script>
