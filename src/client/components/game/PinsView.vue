<script setup lang="ts">
import { useCardsStore } from '../../stores/cardsStore'
import { storeToRefs } from 'pinia'
import GameCard from './GameCard.vue'
import type { UICard } from '../../../data/Card'

const pinsStore = useCardsStore()
const { pins } = storeToRefs(pinsStore)

function toggleSelected(pin: UICard) {
    pinsStore.selectPin(pin)
}
</script>

<template>
    <div class="tenpins">
        <div class="pinrow" v-for="(pinrow, rowindex) in pins" :key="rowindex">
            <GameCard
                v-for="(pin, pinindex) in pinrow"
                :key="pinindex"
                v-bind="pin"
                @selected="toggleSelected(pin)"
                @deselected="toggleSelected(pin)"
                :should-display-select-order="true"
            >
            </GameCard>
        </div>
    </div>
</template>

<style>
.tenpins {
    width: 300px;
}

.pinrow {
    display: flex;
    justify-content: center;
}
</style>
