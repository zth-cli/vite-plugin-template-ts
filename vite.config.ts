import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true, // 解构 props
      },
    }),
    vueJsx(),
    Inspect(),
  ],
  server: {
    port: 3334,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      input: ['src/index.ts'],
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'myPlugin', // 在umd模式下生成全局变量名（window.myPlugin）
      fileName: (format) => `my-plugin.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
  resolve: {
    alias: {
      '@': resolve('example'),
    },
  },
})
