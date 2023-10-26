<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCardsStore } from '../../stores/cardsStore'
import { computed } from 'vue'
import { bowlSelection, passToNextBall } from '../../../faux-server/faux-server-interface'

const cardStore = useCardsStore()
const { hasValidSelection, selectedPinsCoords, selectedSolitaireCoords } = storeToRefs(cardStore)

const hasPartialSelection = computed(
    () => selectedPinsCoords.value.length > 0 || selectedSolitaireCoords.value.length > 0
)

function confirmSelection() {
    bowlSelection(selectedPinsCoords.value, selectedSolitaireCoords.value)
}

function pass() {
    passToNextBall()
}
</script>

<template>
    <button :disabled="!hasValidSelection" @click="confirmSelection">Confirm</button>
    <button :disabled="hasPartialSelection" @click="pass">Pass</button>
</template>

<style></style>
