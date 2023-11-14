import GameView from './client/components/game/GameView.vue'
import RulesView from './client/components/rules/RulesView.vue'
import WelcomeMenu from './client/components/menu/WelcomeMenu.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { initialiseGame } from './faux-server/faux-server-interface'

const routes = [
    {
        path: '/',
        component: WelcomeMenu
    },
    {
        name: 'game',
        path: '/game',
        component: GameView
    },
    {
        name: 'seededGame',
        path: '/game/seeded/:seed',
        component: GameView,
        beforeEnter: (to: RouteLocationNormalized) => {
            initialiseGame(to.params['seed'] as string)
            return { path: '/game' }
        }
    },
    {
        name: 'randomNewGame',
        path: '/game/new',
        component: GameView,
        beforeEnter: () => {
            initialiseGame()
            return { path: '/game' }
        }
    },
    {
        name: 'continueGame',
        path: '/game/continue',
        component: GameView
    },
    {
        name: 'rules',
        path: '/rules',
        component: RulesView
    }
]

const appRouter = createRouter({
    history: createWebHashHistory(),
    routes
})

export default appRouter
