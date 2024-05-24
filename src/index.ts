import { App } from 'vue'
import MyButton from './components/TestButton.vue'

export { MyButton }

export default {
  install(app: App) {
    app.component('MyButton', MyButton)
  },
  MyButton,
}
