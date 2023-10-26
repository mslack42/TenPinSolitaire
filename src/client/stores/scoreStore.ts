import type { FrameScore } from '@/data/FrameScore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useScoreStore = defineStore('clientScore', () => {
    const scoreboard = ref<FrameScore[]>([])
    const isGameOngoing = computed(() => scoreboard.value&& scoreboard.value.length > 0 )
    const isGameFinished = computed(() => scoreboard?.value[9]?.frameRunningTotal !== null)

    function refreshScoreboard(newScoreboard: FrameScore[]) {
        scoreboard.value = newScoreboard
    }

    return {
        scoreboard,
        isGameOngoing,
        isGameFinished,
        refreshScoreboard
    }
})
