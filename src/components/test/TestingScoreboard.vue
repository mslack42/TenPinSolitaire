<script setup>
import { useScoreStore } from '../../stores/scoreStore'
import { ref } from 'vue'

const scoreStore = useScoreStore()
const bowl = ref(0)

function recordBowl() {
    scoreStore.saveNewBowl(bowl.value)
    bowl.value = null
}
</script>

<template>
    <form @submit.prevent="recordBowl">
        <input type="number" v-model="bowl" />
    </form>
</template>

<style scoped></style>
