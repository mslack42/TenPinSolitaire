<script setup>
import { useScoreStore } from '../../stores/scoreStore'
import { computed } from 'vue'
import { storeToRefs } from 'pinia';

const scoreStore = useScoreStore()
const { scoreboard, totals } = storeToRefs(scoreStore)

const ballsCount = computed(() => {
    return scoreboard.value.length
})
const ballBoxCounts = computed(() => {
    return scoreboard.value.map(bs => bs.length)
})

function displayBallFormat(roundIdx, ballIdx, scoreboard) {
    const ballScore = scoreboard[roundIdx][ballIdx]
    const previousBallScoreInRound = ballIdx > 0 ? scoreboard[roundIdx][ballIdx - 1] : null

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
            <template v-for="i in ballsCount">
                <th :colspan="ballBoxCounts[i - 1]">{{ i }}</th>
            </template>
        </tr>
        <tr>
            <template v-for="i in ballsCount">
                <td v-for="j in ballBoxCounts[i - 1]">{{ displayBallFormat(i - 1, j - 1, scoreboard) }}</td>
            </template>
        </tr>
        <tr>
            <template v-for="i in ballsCount">
                <th :colspan="ballBoxCounts[i - 1]">{{ totals[i - 1] }}</th>
            </template>
        </tr>
    </table>
</template>

<style scoped>
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
