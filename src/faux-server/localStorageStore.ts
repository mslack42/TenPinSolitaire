import { watch } from 'vue'
import { useCardsStore } from './stores/cardsStore'
import { useCoordinationStore } from './stores/coordinationStore'
import { useScoreboardStore } from './stores/scoreBoard'
import { defineStore } from 'pinia'
import type { CachedState } from '@/data/CachedState'
import { useRouter } from 'vue-router'

export const useLocalStorageStore = defineStore('localStorageMgmt', () => {
    const cardStore = useCardsStore()
    const coordStore = useCoordinationStore()
    const scoreStore = useScoreboardStore()

    function loadState() {
        const tenpinStateStr = localStorage.getItem('tenpinState')
        if (tenpinStateStr) {
            console.log('Loading existing game...')
            try {
                const tenpinState = JSON.parse(tenpinStateStr)
                cardStore.load(tenpinState.cards)
                coordStore.load(tenpinState.coord)
                scoreStore.load(tenpinState.score)
            } catch (err) {
                console.log('Failed to load game. Redirecting...')
                const $router = useRouter()
                $router.push('/')
            }
        } else {
            const $router = useRouter()
            $router.push('/')
        }
    }

    function saveState() {
        const tenpinState: CachedState = {
            cards: cardStore.exportForCache(),
            coord: coordStore.exportForCache(),
            score: scoreStore.exportForCache()
        }
        localStorage.setItem('tenpinState', JSON.stringify(tenpinState))
    }

    watch([cardStore, coordStore, scoreStore], () => {
        saveState()
    })

    return {
        loadState
    }
})
