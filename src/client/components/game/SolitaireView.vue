<script setup lang="ts">
import { useCardsStore } from '../../stores/cardsStore'
import { storeToRefs } from 'pinia'
import GameCard from './GameCard.vue'
import type { UICard } from '../../../data/Card'

const solitaireStore = useCardsStore()
const { solitaire } = storeToRefs(solitaireStore)

function toggleSelected(card: UICard) {
    solitaireStore.selectSolitaireCard(card)
}
</script>

<template>
    <div class="solitaire-wrapper">
        <div class="solitaire">
            <div class="cardcol" v-for="(col, colIndex) in solitaire" :key="colIndex">
                <GameCard
                    v-for="(card, cardindex) in col"
                    :key="cardindex"
                    v-bind="card"
                    @selected="toggleSelected(card)"
                    @deselected="toggleSelected(card)"
                    :should-display-select-order="false"
                >
                </GameCard>
            </div>
        </div>
    </div>
</template>

<style>
.solitaire-wrapper {
    display: flex;
    justify-content: center;
    height: 120px;
    overflow-y: visible;
}

.solitaire {
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
