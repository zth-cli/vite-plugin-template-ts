import * as Vue from 'vue'
// 将Vue挂载到全局
// @ts-ignore
window.Vue = Vue
import './style.scss'
import App from './App.vue'
import Atnv from '../src'
Vue.createApp(App).use(Atnv).mount('#app')
