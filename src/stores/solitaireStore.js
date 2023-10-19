import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialSolitaireState } from '../constants/initialSolitaireState'

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

    function getState() {
        return {
            solitaire: solitaire.value
        }
    }

    return {
        solitaire
    }
})
