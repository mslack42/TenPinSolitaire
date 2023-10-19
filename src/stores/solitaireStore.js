import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialSolitaireState } from '../constants/initialSolitaireState'
import { updateSolitaireSelectability } from '../logic/solitaire/update-selectability'
import { getSelectedCardCoordinates } from '../logic/general/get-selected-pin-coordinates';

const storageKey = 'solitaire'

export const useSolitaireStore = defineStore(storageKey, () => {
    const solitaire = ref(initialSolitaireState.solitaire)
    const selectedCardCoords = computed(() => getSelectedCardCoordinates(solitaire.value))

    function updateSelectability() {
        solitaire.value = updateSolitaireSelectability(solitaire.value)
    }

    return {
        solitaire,
        selectedCardCoords,
        updateSelectability
    }
})
