import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialScoreState } from '../constants/initialScoreState'
import { generateScoreboardFromBowls } from '../logic/scoreboard/generate-scoreboard-from-bowls';
import { generateTotalsFromScoreBoard } from '../logic/scoreboard/generate-totals-from-scoreboard';

const storageKey = 'score'

let scoreState = localStorage.getItem(storageKey);
if (!scoreState) {
    scoreState = structuredClone(initialScoreState)
} else {
    scoreState = JSON.parse(scoreState)
}


function persistStore(state) {
    let newState = {
        balls: state.balls
    }
    localStorage.setItem(storageKey, JSON.stringify(newState))
}

export const useScoreStore = defineStore(storageKey, () => {
    const balls = ref(scoreState.balls)
    const scoreboard = computed(() => generateScoreboardFromBowls(balls.value))
    const totals = computed(() => generateTotalsFromScoreBoard(generateScoreboardFromBowls(balls.value)))
    const pendingBall = ref(scoreState.pendingBall)


    function getState() {
        return {
            balls: balls.value,
            pendingBall: pendingBall.value
        }
    }

    function saveNewPendingBowl(bowlIncrement) {
        pendingBall.value = pendingBall.value + bowlIncrement
        persistStore(getState())
    }

    function commitBowl() {
        balls.value.push(pendingBall.value)
        pendingBall.value = 0
        persistStore(getState())
    }

    function reset() {
        balls.value = []
        persistStore(getState())
    }

    return {
        balls,
        scoreboard,
        totals,
        commitBowl,
        saveNewPendingBowl,
        reset
    }
})
