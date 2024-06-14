import { build, InlineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
// import commonjs from '@rollup/plugin-commonjs'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

/**
 * 在 ES 模块中，__dirname 不是一个全局变量，因为它是 CommonJS 模块的一部分。
 */
const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * 获取所有插件, 匹配plugins目录下的二级目录
 */
const modules = fg.globSync('./plugins/*/*.ts')

const libraries = modules.map((module) => {
  const name = module.split('/')[2]
  return {
    entry: resolve(__dirname, module),
    name,
    filename: `${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
  }
})

// const libraries = [
//   {
//     entry: resolve(__dirname, 'plugins/index.ts'),
//     name: 'myPlugin',
//     filename: 'my-plugin',
//   },
// ]

libraries.forEach(async (lib) => {
  console.log(lib)
  const config: InlineConfig = {
    configFile: false,
    plugins: [
      vue(),
      vueJsx(),
      cssInjectedByJsPlugin(),
      dts({
        include: ['src/**/*.ts', 'lib/**/*.ts'],
        copyDtsFiles: true,
        outDir: resolve(__dirname, 'dist/types'),
      }),
      // commonjs(),
    ],
    build: {
      lib: {
        entry: lib.entry,
        name: lib.name,
        fileName: (format) => `${lib.filename}.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: { vue: 'Vue' },
          exports: 'named',
          // 在umd模式下生成全局变量名（window.myPlugin）
          name: lib.name,
          // 指定输出目录
          dir: resolve(__dirname, `dist/${lib.name}`),
        },
      },
    },
  }

  try {
    console.log('Built...')
    await build(config)
    console.log(`Built library: ${lib.name}`)
  } catch (error) {
    console.error(`Error building library: ${lib.name}`, error)
  }
})
