import { updateClientScoreState } from '@/client/client-interface'
import type { FrameScore } from '@/data/FrameScore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { applyRunningTotals } from './score/applyRunningTotals'
import type { ScoreState } from '@/data/CachedState'

export const useScoreboardStore = defineStore('serverScoreboard', () => {
    const _scoreboard = ref<FrameScore[]>([])
    const scoreboard = computed<FrameScore[]>(() => applyRunningTotals(_scoreboard.value))

    function resetScoreboard() {
        _scoreboard.value = [
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null] },
            { balls: [null, null, null] }
        ]
        updateClientScoreState(scoreboard.value)
    }

    function updateScoreboard(frameNumber: number, ballNumber: number, value: number) {
        _scoreboard.value[frameNumber - 1].balls[ballNumber - 1] = value
        updateClientScoreState(scoreboard.value)
    }

    function load(scoreState: ScoreState) {
        _scoreboard.value = scoreState._scoreboard

        updateClientScoreState(scoreboard.value)
    }

    function exportForCache() {
        return {
            _scoreboard: _scoreboard.value
        }
    }

    return {
        scoreboard,
        resetScoreboard,
        updateScoreboard,
        load,
        exportForCache
    }
})
