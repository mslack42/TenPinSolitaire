<script setup lang="ts">
import ModalDialog from '../common/ModalDialog.vue'
import { useCardsStore } from '../../stores/cardsStore'
import { storeToRefs } from 'pinia'
import GameCard from './GameCard.vue'
import ActionButton from '../common/ActionButton.vue'

defineProps({
    open: Boolean
})
defineEmits(['close'])

const cardsStore = useCardsStore()
const { discards } = storeToRefs(cardsStore)
</script>

<template>
    <ModalDialog :isOpen="open">
        <template v-slot:modal-header>
            <h1>All Discards:</h1>
        </template>
        <template v-slot:modal-body>
            <div class="card-spread">
                <GameCard
                    v-for="(card, cardindex) in discards"
                    :key="cardindex"
                    v-bind="card"
                    :should-display-select-order="false"
                    :is-removed="false"
                >
                </GameCard>
            </div>
        </template>
        <template v-slot:modal-footer>
            <ActionButton
                class="modal-button"
                action-type="NoConsequenceAction"
                @clicked="$emit('close')"
                >Close</ActionButton
            >
        </template>
    </ModalDialog>
</template>

<style scoped>
.action {
    display: inline-block;
    padding: 5px;
}

.modal-button {
    display: inline-block;
    padding: 5px 15px;
}

.card-spread {
    display: flex;
    flex-wrap: wrap;
}
</style>
