<script setup>
import { usePinsStore } from '../../stores/pinsStore'
import { useSolitaireStore } from '../../stores/solitaireStore'
import { useScoreStore } from '../../stores/scoreStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

const pinsStore = usePinsStore()
const { pins, selectedPinCoords } = storeToRefs(pinsStore)
const solitaireStore = useSolitaireStore()
const { solitaire, selectedCardCoords } = storeToRefs(solitaireStore)
const scoreStore = useScoreStore()
const { balls, scoreboard, totals } = storeToRefs(scoreStore)

const isHitValid = computed(() => {
    if (totals.value[totals.value.length - 1] !== null) {
        // The game is over
        return false
    }
    if (selectedPinCoords.value.length === 0 || selectedCardCoords.value.length === 0) {
        return false
    }
    const pinSum = selectedPinCoords.value.map(c => pins.value[c[0]][c[1]].value).reduce((a, b) => a + b)
    const solitaireSum = selectedCardCoords.value.map(c => solitaire.value[c[0]][c[1]].value).reduce((a, b) => a + b)

    return (pinSum % 10) - (solitaireSum % 10) === 0
})

function makeHit() {
    scoreStore.saveNewPendingBowl(selectedPinCoords.value.length)
    // Remove selected cards from pins (plus upkeep)
    // Remove selected card from solitaire (plus upkeep)
}

function pass() {
    scoreStore.commitBowl()
    // Update the pins and the solitaire if we need to
}
</script>

<template>
    <button :disabled="!isHitValid" @click="makeHit">Confirm</button>
    <button @click="pass">Pass</button>
</template>

<style scoped></style>
