<script setup lang="ts">
import PinsView from './PinsView.vue'
import SolitaireView from './SolitaireView.vue'
import GameActions from './GameActions.vue'
import ScoreBoard from './ScoreBoard.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useScoreStore } from '../../stores/scoreStore'
import { useCardsStore } from '@/client/stores/cardsStore'
import { initialiseGame } from '@/faux-server/faux-server-interface'

onBeforeRouteUpdate((to) => {
    if (to.params['seed']) {
        initialiseGame(to.params['seed'] as string)
    } else {
        initialiseGame()
    }
})

const scoreStore = useScoreStore()
const { scoreboard, isGameOngoing } = storeToRefs(scoreStore)
const scoreboardData = computed(() => {
    return {
        scoreboard: scoreboard.value
    }
})
const cardStore = useCardsStore()
const { currentSeed } = storeToRefs(cardStore)
</script>

<template>
    <RouterLink to="/">Back to menu...<br /></RouterLink>
    <template v-if="currentSeed">
        <div>Current Seed: {{ currentSeed }}</div>
    </template>
    <ScoreBoard v-bind="scoreboardData"></ScoreBoard>
    <template v-if="isGameOngoing">
        <PinsView></PinsView>
        <SolitaireView></SolitaireView>
        <GameActions></GameActions>
    </template>
    <template v-else>
        <div>Game Over! Final Score: {{ scoreboard[9].frameRunningTotal }}</div></template
    >
</template>

<style></style>
