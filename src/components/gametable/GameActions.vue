<script setup>
import { usePinsStore } from '../../stores/pinsStore'
import { useSolitaireStore } from '../../stores/solitaireStore'
import { useScoreStore } from '../../stores/scoreStore'
import { useCentralStore } from '../../stores/centralStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const pinsStore = usePinsStore()
const { pins, selectedPinCoords, coordinatesHitThisBall } =
    storeToRefs(pinsStore)
const solitaireStore = useSolitaireStore()
const { solitaire, selectedCardCoords } = storeToRefs(solitaireStore)
const scoreStore = useScoreStore()
const { currentFrame, currentBall, totals } = storeToRefs(scoreStore)
const centralStore = useCentralStore()

const isHitValid = computed(() => {
    if (totals.value[totals.value.length - 1] !== null) {
        // The game is over
        return false
    }
    if (
        selectedPinCoords.value.length === 0 ||
        selectedCardCoords.value.length === 0
    ) {
        return false
    }
    const pinSum = selectedPinCoords.value
        .map((c) => pins.value[c[0]][c[1]].value)
        .reduce((a, b) => a + b)
    const solitaireSum = selectedCardCoords.value
        .map((c) => solitaire.value[c[0]][c[1]].value)
        .reduce((a, b) => a + b)

    return (pinSum % 10) - (solitaireSum % 10) === 0
})

function makeHit() {
    scoreStore.saveNewPendingBowl(selectedPinCoords.value.length)
    // Remove selected cards from pins (plus upkeep)
    coordinatesHitThisBall.value = coordinatesHitThisBall.value.concat(
        selectedPinCoords.value
    )
    selectedPinCoords.value.forEach((c) => {
        const [x, y] = c
        const pin = pins.value[x][y]
        pin.isPresent = false
        pin.isSelectable = false
        pin.isSelected = false
    })

    // Remove selected card from solitaire (plus upkeep)
    const [cx, cy] = selectedCardCoords.value[0]
    const card = solitaire.value[cx][cy]
    card.isPresent = false
    card.isSelected = false
    card.isShrunk = true
    if (cy > 0) {
        const nextCard = solitaire.value[cx][cy - 1]
        nextCard.isFaceUp = true
        nextCard.isShrunk = false
    }

    pinsStore.updateSelectability()
    solitaireStore.updateSelectability()
}

function pass() {
    const activeFrame = currentFrame.value
    console.log(activeFrame)
    console.log(currentBall.value)
    scoreStore.commitBowl()
    const nextFrame = currentFrame.value
    console.log(activeFrame)
    console.log(nextFrame)
    console.log(currentBall.value)
    // Update the pins and the solitaire if we need to
    if (activeFrame === nextFrame) {
        coordinatesHitThisBall.value = []
        solitaire.value.forEach((col) => {
            const lastTwoCards = col.reduce(
                (pair, card) => {
                    if (card.isPresent) {
                        return [pair[1], card]
                    } else {
                        return pair
                    }
                },
                [null, null]
            )
            if (lastTwoCards[1]) {
                lastTwoCards[1].isPresent = false
                lastTwoCards[1].isSelected = false
                lastTwoCards[1].isShrunk = true
            }
            if (lastTwoCards[0]) {
                lastTwoCards[0].isFaceUp = true
                lastTwoCards[0].isShrunk = false
            }
        })
    } else {
        centralStore.dealFreshCards()
    }

    pinsStore.updateSelectability()
    solitaireStore.updateSelectability()
}
</script>

<template>
    <button :disabled="!isHitValid" @click="makeHit">Confirm</button>
    <button
        :disabled="selectedPinCoords.length || selectedCardCoords.length"
        @click="pass"
    >
        Pass
    </button>
</template>

<style scoped></style>
