import { createApp } from 'vue'
import App from './App.vue'
import { piniaObj } from './stores/piniaInstance'

const app = createApp(App)

app.use(piniaObj)

app.mount('#app')
