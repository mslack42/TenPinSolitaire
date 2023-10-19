<script setup>
import { useScoreStore } from '../stores/scoreStore'
import { useCentralStore } from '../stores/centralStore'

const scoreStore = useScoreStore()
const centralStore = useCentralStore()

function restart() {
    scoreStore.reset()
    centralStore.dealFreshCards()
}

</script>

<template>
    <button @click="restart">Restart</button>
</template>

<style scoped></style>
