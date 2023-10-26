import { createApp } from 'vue'
import App from './App.vue'
import appRouter from './Router'
import { piniaObj } from './Pinia'

const app = createApp(App)

app.use(piniaObj)
app.use(appRouter)
app.mount('#app')
