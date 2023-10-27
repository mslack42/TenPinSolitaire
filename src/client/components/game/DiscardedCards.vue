<script setup lang="ts">
import { useCardsStore } from '../../stores/cardsStore'
import { storeToRefs } from 'pinia'
import GameCard from './GameCard.vue'
import DiscardsModal from './DiscardsModal.vue'
import { ref } from 'vue'

const cardsStore = useCardsStore()
const { discards } = storeToRefs(cardsStore)

const openDiscardsModal = ref(false)
</script>

<template>
    <div class="discards">
        <div class="cardcol" @click="openDiscardsModal = true">
            <GameCard
                v-for="(card, cardindex) in discards"
                :key="cardindex"
                v-bind="card"
                :should-display-select-order="false"
                :is-removed="false"
                :select-order="undefined"
                :is-decked="cardindex !== discards.length - 1"
            >
            </GameCard>
        </div>
    </div>
    <DiscardsModal :open="openDiscardsModal" @close="openDiscardsModal = false"></DiscardsModal>
</template>

<style>
.discards {
    display: flex;
    justify-content: center;
    width: 300px;
}

.cardcol {
    display: flex;
    align-items: start;
    flex-direction: column;
    margin: 2px 10px;
}
</style>
