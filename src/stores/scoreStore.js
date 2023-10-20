import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateScoreboardFromBowls } from '../logic/scoreboard/generate-scoreboard-from-bowls'
import { generateTotalsFromScoreBoard } from '../logic/scoreboard/generate-totals-from-scoreboard'
import {
    getCurrentFrame,
    getCurrentFrameBall
} from '../logic/scoreboard/get-current-frame'
const storageKey = 'score'

export const useScoreStore = defineStore(storageKey, () => {
    const balls = ref([])
    const scoreboard = computed(() => generateScoreboardFromBowls(balls.value))
    const totals = computed(() =>
        generateTotalsFromScoreBoard(scoreboard.value)
    )
    const currentFrame = computed(() => getCurrentFrame(scoreboard.value))
    const currentBall = computed(() => getCurrentFrameBall(scoreboard.value))
    const pendingBall = ref(0)

    function saveNewPendingBowl(bowlIncrement) {
        pendingBall.value = pendingBall.value + bowlIncrement
    }

    function commitBowl() {
        balls.value.push(pendingBall.value)
        pendingBall.value = 0
    }

    function reset() {
        balls.value = []
    }

    return {
        balls,
        pendingBall,
        scoreboard,
        totals,
        currentBall,
        currentFrame,
        commitBowl,
        saveNewPendingBowl,
        reset
    }
})
