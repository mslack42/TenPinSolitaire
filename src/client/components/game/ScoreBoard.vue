<script setup lang="ts">
import type { FrameScore } from '../../../data/FrameScore'

interface Props {
    scoreboard: FrameScore[]
}

const props = defineProps<Props>()

function displayBallFormat(frame: FrameScore, ballIdx: number) {
    const ballScore = frame.balls[ballIdx]
    const previousBallScoreInRound = ballIdx > 0 ? frame.balls[ballIdx - 1] : null

    if (ballScore === null) {
        return ' '
    }
    if (ballScore === 10) {
        return 'X'
    }
    if (previousBallScoreInRound !== null && ballScore + previousBallScoreInRound === 10) {
        return '/'
    }
    if (ballScore === 0) {
        return '-'
    }
    return ballScore
}
</script>

<template>
    <table>
        <tr>
            <template v-for="(_, roundIdx) in props.scoreboard" :key="roundIdx">
                <th :colspan="roundIdx === 9 ? 3 : 2">{{ roundIdx + 1 }}</th>
            </template>
        </tr>
        <tr>
            <template v-for="(frame, roundIdx) in props.scoreboard" :key="roundIdx">
                <td>{{ displayBallFormat(frame, 0) }}</td>
                <td>{{ displayBallFormat(frame, 1) }}</td>
                <td v-if="roundIdx == 9">{{ displayBallFormat(frame, 2) }}</td>
            </template>
        </tr>
        <tr>
            <template v-for="(frame, roundIdx) in props.scoreboard" :key="roundIdx">
                <th :colspan="roundIdx === 9 ? 3 : 2">{{ frame.frameRunningTotal }}</th>
            </template>
        </tr>
    </table>
</template>

<style>
table {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-collapse: collapse;
    display: inline-block;
}

tr,
td,
th {
    max-width: 20px;
    min-width: 15px;
    height: 15px;
    border: 1px solid black;
    border-collapse: collapse;
}
</style>
