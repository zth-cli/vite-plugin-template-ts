import * as Vue from 'vue'
// 将Vue挂载到全局
// @ts-ignore
window.Vue = Vue
import './style.scss'
import App from './App.vue'
Vue.createApp(App).mount('#app')
