import type { CoordState } from '@/data/CachedState'
import type { FrameScore } from '@/data/FrameScore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCoordinationStore = defineStore('serverCoordination', () => {
    const _currentFrame = ref<number>(1)
    const _currentBall = ref<number>(1)
    const isGameOver = ref<boolean>(false)

    const currentFrame = computed(() => _currentFrame.value)
    const currentBall = computed(() => _currentBall.value)

    function resetCoordination() {
        _currentFrame.value = 1
        _currentBall.value = 1
    }

    function goToNext(scoreboard: FrameScore[]) {
        const currentFrameScore = scoreboard[currentFrame.value - 1]
        const nonNullBalls = currentFrameScore.balls.filter((b) => b !== null) as number[]
        if (currentFrame.value === 10) {
            if (
                nonNullBalls.length === 1 ||
                (nonNullBalls.length === 2 && nonNullBalls[0] + nonNullBalls[1] >= 10)
            ) {
                _currentBall.value = _currentBall.value + 1
            } else {
                _currentFrame.value = _currentFrame.value + 1
                _currentBall.value = 1
                isGameOver.value = true
            }
        } else if (currentFrame.value < 10) {
            if (
                nonNullBalls.length === 2 ||
                (nonNullBalls.length === 1 && nonNullBalls[0] === 10)
            ) {
                _currentFrame.value = _currentFrame.value + 1
                _currentBall.value = 1
            } else {
                _currentBall.value = _currentBall.value + 1
            }
        }
    }

    function load(coordState: CoordState) {
        _currentFrame.value = coordState._currentFrame,
        _currentBall.value = coordState._currentBall
    }

    function exportForCache() {
        return {
            _currentFrame: _currentFrame.value,
            _currentBall: _currentBall.value
        }
    }

    return {
        currentFrame,
        currentBall,
        isGameOver,
        resetCoordination,
        goToNext,
        load,
        exportForCache
    }
})
