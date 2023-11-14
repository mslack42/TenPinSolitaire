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
import { useCardsStore } from '@/client/stores/cardsStore'

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

const cardStore = useCardsStore()
const { currentSeed } = storeToRefs(cardStore)

function copySeed() {
    navigator.clipboard.writeText(currentSeed.value!)
}
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
                <div>
                    <p>You can play the same game again using the seed:</p>
                    <div class="seed-line">
                        <p>{{ currentSeed }}</p>
                        <img class="copy" src="@/assets/copy.svg" @click="copySeed" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.seed-line {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.copy {
    height: 20px;
    display: inline-block;
    cursor: pointer;
}

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
    min-height: 630px;
    max-height: 700px;
    max-width: 550px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    gap: 5px;
}
</style>
