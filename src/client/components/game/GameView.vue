<script setup lang="ts">
import PinsView from './PinsView.vue'
import SolitaireView from './SolitaireView.vue'
import GameActions from './GameActions.vue'
import ScoreBoard from './ScoreBoard.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useScoreStore } from '../../stores/scoreStore'
import { initialiseGame } from '@/faux-server/faux-server-interface'
import ActionButton from '../common/ActionButton.vue'

onBeforeRouteUpdate((to) => {
    if (to.params['seed']) {
        initialiseGame(to.params['seed'] as string)
    } else {
        initialiseGame()
    }
})

const scoreStore = useScoreStore()
const { scoreboard, isGameOngoing, isGameFinished } = storeToRefs(scoreStore)
const scoreboardData = computed(() => {
    return {
        scoreboard: scoreboard.value
    }
})
</script>

<template>
    <div id="appBody">
    <ScoreBoard v-bind="scoreboardData"></ScoreBoard>
    <template v-if="isGameOngoing && !isGameFinished">
        <PinsView></PinsView>
        <SolitaireView></SolitaireView>
        <!-- <DiscardedCards></DiscardedCards> -->
        <GameActions></GameActions>
    </template>
    <template v-if="isGameFinished">
        <div class="results">
            <h1>Game Over!</h1>
            <h1>Final Score:</h1>
            <h1>{{ scoreboard[9].frameRunningTotal }}</h1>
            <div class="actions">
                <ActionButton action-type="MenuAction" @clicked="$router.push('/')"
                    >Back to menu</ActionButton
                >
            </div>
        </div>
    </template>
</div>
</template>

<style scoped>
.results {
    text-align: center;
}

.actions {
    display: flex;
    justify-content: center;
}

#appBody {
    padding: 0;
    margin: 0;
    position: relative;
    min-height: 650px;
    max-height: 800px;
    max-width: 550px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    gap: 10px;
}
</style>
