<script setup lang="ts">
import { useClientStore } from '@/client/stores/clientStore'
import MenuButton from './MenuButton.vue'
import { AppModes } from '@/client/AppModes'
import { initialiseGame } from '@/faux-server/faux-server-interface'
import { ref } from 'vue'

const clientStore = useClientStore()

function handleReq(value: string) {
    switch (value) {
        case 'NewGame': {
            clientStore.changeAppMode(AppModes.Game)
            initialiseGame(customSeed.value)
            break
        }
        default: {
            console.log('Unhandled navigation')
        }
    }
}

const customSeed = ref('')
</script>

<template>
    <h1>Tenpin Solitaire!!!</h1>
    <MenuButton :enabled="false" :value="'Continue'" @clicked="handleReq">Continue</MenuButton>
    <MenuButton :enabled="false" :value="'Restart'" @clicked="handleReq">Restart</MenuButton>
    <MenuButton :enabled="true" :value="'NewGame'" @clicked="handleReq">New Game</MenuButton>
    <input v-model="customSeed" placeholder="Custom seed..." />
</template>

<style></style>
