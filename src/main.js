import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

// Testing
// const balls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 1, 10]
// const board = generateScoreboardFromBowls(balls)
// const totals = generateTotalsFromScoreBoard(board)

// console.log(board)
// console.log(totals)