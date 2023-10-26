<script setup lang="ts">
import PinsView from './PinsView.vue'
import SolitaireView from './SolitaireView.vue'
import GameActions from './GameActions.vue'
import ScoreBoard from './ScoreBoard.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useScoreStore } from '../../stores/scoreStore'

const scoreStore = useScoreStore()
const { scoreboard } = storeToRefs(scoreStore)
const scoreboardData = computed(() => {
    return {
        scoreboard: scoreboard.value
    }
})
const gameOver = computed(() => {
    return (
        scoreboard.value[9].frameRunningTotal !== undefined &&
        scoreboard.value[9].frameRunningTotal !== null
    )
})
</script>

<template>
    <ScoreBoard v-bind="scoreboardData"></ScoreBoard>
    <template v-if="!gameOver">
        <PinsView></PinsView>
        <SolitaireView></SolitaireView>
        <GameActions></GameActions>
    </template>
    <template v-else>
        <div>Game Over! Final Score: {{ scoreboard[9].frameRunningTotal }}</div></template
    >
</template>

<style></style>
