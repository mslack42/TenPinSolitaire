import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialSolitaireState } from '../constants/initialSolitaireState'
import { updateSolitaireSelectability } from '../logic/solitaire/update-selectability'

const storageKey = 'solitaire'

let solitaireState = localStorage.getItem(storageKey);
if (!solitaireState) {
    solitaireState = structuredClone(initialSolitaireState)
} else {
    solitaireState = JSON.parse(solitaireState)
}

function persistStore(state) {
    let newState = {
        solitaire: state.solitaire
    }
    localStorage.setItem(storageKey, JSON.stringify(newState))
}

export const useSolitaireStore = defineStore(storageKey, () => {
    const solitaire = ref(solitaireState.solitaire)
    // const selectedCard = computed(())

    function getState() {
        return {
            solitaire: solitaire.value
        }
    }

    function updateSelectability() {
        solitaire.value = updateSolitaireSelectability(solitaire.value)
    }

    return {
        solitaire,
        updateSelectability
    }
})
