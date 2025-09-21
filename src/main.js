import '@/assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import WebFont from 'webfontloader'

const app = createApp(App)
const pinia = createPinia()

WebFont.load({
  google: {
    families: [
      'Poppins:wght@100..900',
      'Roboto:wght@100..900',
      'Roboto+Flex:opsz,wght@8..144,100..1000',
    ],
  },
})

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
app.mount('#app')
