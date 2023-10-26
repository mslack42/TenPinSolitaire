<script setup lang="ts">
import { useScoreStore } from '@/client/stores/scoreStore';
import MenuButton from './MenuButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

const customSeed = ref('')
const $router = useRouter()

function handleReq(value: string) {
    switch (value) {
        case 'NewGame': {
            if (customSeed.value && customSeed.value !== '') {
                $router.push('/game/seeded/' + customSeed.value)
            } else {
                $router.push('/game/new')
            }
            break
        }
        case 'Continue': {
            $router.push('/game/continue')
            break
        }
        default: {
            console.log('Unhandled navigation')
        }
    }
}

const scoreStore = useScoreStore()
const { isGameOngoing } = storeToRefs(scoreStore)

</script>

<template>
    <h1>Tenpin Solitaire!!!</h1>
    <MenuButton :enabled="isGameOngoing" :value="'Continue'" @clicked="handleReq">Continue</MenuButton>
    <MenuButton :enabled="true" :value="'NewGame'" @clicked="handleReq">New Game</MenuButton>
    <input v-model="customSeed" placeholder="Custom seed..." />
</template>

<style></style>
