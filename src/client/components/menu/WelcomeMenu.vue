<script setup lang="ts">
import { useClientStore } from '@/client/stores/clientStore'
import MenuButton from './MenuButton.vue'
import { AppModes } from '@/client/AppModes'
import { initialiseGame } from '@/faux-server/faux-server-interface'

const clientStore = useClientStore()

function handleReq(value: string) {
    switch (value) {
        case 'NewGame': {
            clientStore.changeAppMode(AppModes.Game)
            initialiseGame()
            break
        }
        default: {
            console.log('Unhandled navigation')
        }
    }
}
</script>

<template>
    <h1>Tenpin Solitaire!!!</h1>
    <MenuButton :enabled="false" :value="'Continue'" @clicked="handleReq">Continue</MenuButton>
    <MenuButton :enabled="false" :value="'Restart'" @clicked="handleReq">Restart</MenuButton>
    <MenuButton :enabled="true" :value="'NewGame'" @clicked="handleReq">New Game</MenuButton>
</template>

<style></style>
