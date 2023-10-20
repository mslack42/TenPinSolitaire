import { defineStore, storeToRefs } from 'pinia'
import { usePinsStore } from '../stores/pinsStore'
import { useSolitaireStore } from '../stores/solitaireStore'
import { useScoreStore } from './scoreStore'
import { dealCards } from '../logic/general/deal-cards'
import { watch } from 'vue'
import { piniaObj } from './piniaInstance'

export const useCentralStore = defineStore('central', () => {
    const pinsStore = usePinsStore()
    const { pins, coordinatesHitThisBall } = storeToRefs(pinsStore)
    const solitaireStore = useSolitaireStore()
    const { solitaire } = storeToRefs(solitaireStore)
    const scoreStore = useScoreStore()
    const { balls, pendingBall } = storeToRefs(scoreStore)

    function dealFreshCards() {
        const newDeal = dealCards()
        applyAllState(newDeal.pins, [], newDeal.solitaire, balls.value, 0)
        pinsStore.updateSelectability()
        solitaireStore.updateSelectability()
    }

    function applyAllState(
        newPins,
        newCoordinatesHitThisBall,
        newSolitaire,
        newBalls,
        newPendingBall
    ) {
        pins.value = newPins
        coordinatesHitThisBall.value = newCoordinatesHitThisBall
        solitaire.value = newSolitaire
        balls.value = newBalls
        pendingBall.value = newPendingBall
    }

    function loadGame() {
        let existingState = localStorage.getItem('tenpinState')
        if (existingState) {
            existingState = JSON.parse(existingState)
            applyAllState(
                existingState.pins.pins,
                existingState.pins.coordinatesHitThisBall,
                existingState.solitaire.solitaire,
                existingState.score.balls,
                existingState.score.pendingBall
            )
        }
    }

    watch(
        piniaObj.state,
        (state) => {
            // persist the whole state to the local storage whenever it changes
            localStorage.setItem('tenpinState', JSON.stringify(state))
        },
        { deep: true }
    )

    loadGame()

    return {
        dealFreshCards
    }
})
