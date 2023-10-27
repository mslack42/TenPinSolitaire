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
    <div class="tenpins-wrapper">
    <div class="tenpins">
        <div class="pinrow" v-for="(pinrow, rowindex) in pins" :key="rowindex">
            <div class="card-socket" v-for="(pin, pinindex) in pinrow" :key="pinindex">
                <GameCard
                    v-bind="pin"
                    @selected="toggleSelected(pin)"
                    @deselected="toggleSelected(pin)"
                    :should-display-select-order="true"
                >
                </GameCard>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.tenpins-wrapper {
    display: flex;
    justify-content: center;
}

.tenpins {
    width: 300px;

}

.pinrow {
    display: flex;
    justify-content: center;
}

.card-socket {
    display: flex;
    justify-content: center;
    border-radius: 2px;
    margin: 2px;
    border-color: gray;
    border-style: solid;
    padding: -10px;
}
</style>
