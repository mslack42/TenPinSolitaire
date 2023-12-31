<script setup lang="ts">
import { useScoreStore } from '@/client/stores/scoreStore'
import ActionButton from '../common/ActionButton.vue'
import NewGameConfigModal from './NewGameConfigModal.vue'
import NewGameWarningModal from './NewGameWarningModal.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCardsStore } from '@/client/stores/cardsStore'

const $router = useRouter()

const openNewGameWarning = ref(false)
const openNewGameConfig = ref(false)

function openNewGameDialog() {
    if (isGameOngoing.value && !isGameFinished.value) {
        openNewGameWarning.value = true
    } else {
        openNewGameConfig.value = true
    }
}

function createNewGame(seed?: string) {
    openNewGameConfig.value = false
    if (seed && seed !== '') {
        $router.push('/game/seeded/' + seed)
    } else {
        $router.push('/game/new')
    }
}

function forceCreateNewGame() {
    openNewGameWarning.value = false
    openNewGameConfig.value = true
}

const scoreStore = useScoreStore()
const { isGameOngoing, isGameFinished } = storeToRefs(scoreStore)
const cardStore = useCardsStore()
const { currentSeed } = storeToRefs(cardStore)
const cannotContinueGame = computed(() => !isGameOngoing.value || isGameFinished.value)

function copySeed() {
    navigator.clipboard.writeText(currentSeed.value!)
}
</script>

<template>
    <div id="appBody">
        <div class="tenpin-title">
            <img class="logo" src="@/assets/bowling.svg" />
            <h1>Tenpin Solitaire!!!</h1>
            <div class="title-buttons">
                <div class="button-wrapper">
                    <ActionButton
                        @clicked="$router.push('/rules')"
                        action-type="NoConsequenceAction"
                        >Rules</ActionButton
                    >
                </div>
                <div class="button-wrapper">
                    <ActionButton
                        action-type="NoConsequenceAction"
                        :disabled="cannotContinueGame"
                        @clicked="$router.push('/game/continue')"
                        >Continue</ActionButton
                    >
                </div>
                <template v-if="!!currentSeed && !cannotContinueGame">
                    <div>Current Seed:</div>
                    <div class="seed-line">
                        <div>{{ currentSeed }}</div>
                        <img class="copy" src="@/assets/copy.svg" @click="copySeed" />
                    </div>
                </template>
                <div class="button-wrapper">
                    <ActionButton
                        @clicked="openNewGameDialog"
                        :action-type="
                            isGameOngoing && !isGameFinished
                                ? 'ConsequenceAction'
                                : 'NoConsequenceAction'
                        "
                        >New Game</ActionButton
                    >
                </div>
            </div>
        </div>
    </div>
    <NewGameConfigModal
        :open="openNewGameConfig"
        @new-game="createNewGame"
        @close="openNewGameConfig = false"
    ></NewGameConfigModal>
    <NewGameWarningModal
        :open="openNewGameWarning"
        @new-game="forceCreateNewGame"
        @close="openNewGameWarning = false"
    ></NewGameWarningModal>
</template>

<style scoped>
.seed-line {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.copy {
    height: 20px;
    display: inline-block;
    cursor: pointer;
}
.logo {
    height: 150px;
}
.tenpin-title {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 20px;
    color: white;
    text-align: center;
}

.title-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 20px;
    text-align: center;
    width: 100%;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
}

.button-wrapper * {
    width: 200px;
}

#appBody {
    min-height: 650px;
    max-height: 800px;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    gap: 10px;
}
</style>
