import { App } from 'vue'
import { MyButton } from './TestButton'

export { MyButton }

export default {
  install(app: App) {
    app.component('MyButton', MyButton)
  },
  MyButton,
}
