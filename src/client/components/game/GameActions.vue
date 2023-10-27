<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCardsStore } from '../../stores/cardsStore'
import { computed, ref } from 'vue'
import { bowlSelection, passToNextBall } from '../../../faux-server/faux-server-interface'
import DiscardsModal from './DiscardsModal.vue'
import ActionButton from '../common/ActionButton.vue'

const cardStore = useCardsStore()
const { hasValidSelection, selectedPinsCoords, selectedSolitaireCoords } = storeToRefs(cardStore)

const hasPartialSelection = computed(
    () => selectedPinsCoords.value.length > 0 || selectedSolitaireCoords.value.length > 0
)

function confirmSelection() {
    bowlSelection(selectedPinsCoords.value, selectedSolitaireCoords.value)
}

function clearSelection() {
    cardStore.clearSelection()
}

function pass() {
    passToNextBall()
}

const openDiscardsModal = ref(false)
</script>

<template>
    <div class="action-bar-wrapper">
        <div class="action-bar">
            <ActionButton
                action-type="ConsequenceAction"
                :disabled="!hasValidSelection"
                @clicked="confirmSelection"
                >Confirm</ActionButton
            >
            <ActionButton
                action-type="ConsequenceAction"
                :disabled="hasPartialSelection"
                @clicked="pass"
                >Pass</ActionButton
            >
            <ActionButton
                action-type="NoConsequenceAction"
                :disabled="hasPartialSelection"
                @clicked="clearSelection"
                >Clear Selection</ActionButton
            >
            <ActionButton action-type="NoConsequenceAction" @clicked="openDiscardsModal = true"
                >See Discards</ActionButton
            >
            <ActionButton action-type="MenuAction" @clicked="$router.push('/')"
                >Back to menu</ActionButton
            >
        </div>
    </div>
    <DiscardsModal :open="openDiscardsModal" @close="openDiscardsModal = false"></DiscardsModal>
</template>

<style>
.action-bar-wrapper {
    display: flex;
    justify-content: center;
    height: 120px;
}

.action-bar {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
