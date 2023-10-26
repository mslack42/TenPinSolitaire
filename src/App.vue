<script setup lang="ts">
import { storeToRefs } from 'pinia'
import WelcomeMenu from './client/components/menu/WelcomeMenu.vue'
import GameView from './client/components/game/GameView.vue'
import { useClientStore } from './client/stores/clientStore'
import { AppModes } from './client/AppModes'

const clientStore = useClientStore()
const { appMode } = storeToRefs(clientStore)
</script>

<template>
    <WelcomeMenu v-if="appMode === AppModes.Welcome"></WelcomeMenu>
    <GameView v-if="appMode === AppModes.Game"></GameView>
</template>

<style></style>
