import type { FrameScore } from '@/data/FrameScore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScoreStore = defineStore('clientScore', () => {
    const scoreboard = ref<FrameScore[]>([])

    function refreshScoreboard(newScoreboard: FrameScore[]) {
        console.log('refreshing scoreboard')
        scoreboard.value = newScoreboard
    }

    return {
        scoreboard,
        refreshScoreboard
    }
})
