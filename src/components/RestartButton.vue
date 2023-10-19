<script setup>
import { useScoreStore } from '../stores/scoreStore'

const scoreStore = useScoreStore()

function restart() {
    scoreStore.reset()
}

</script>

<template>
    <button @click="restart">Restart</button>
</template>

<style scoped></style>
