import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialPinsState } from '../constants/initialPinsState'

const storageKey = 'pins'

let pinsState = localStorage.getItem(storageKey);
if (!pinsState) {
    pinsState = structuredClone(initialPinsState)
} else {
    pinsState = JSON.parse(pinsState)
}

function persistStore(state) {
    let newState = {
        pins: state.pins
    }
    localStorage.setItem(storageKey, JSON.stringify(newState))
}

export const usePinsStore = defineStore(storageKey, () => {
    const pins = ref(pinsState.pins)

    function getState() {
        return {
            pins: pins.value
        }
    }

    return {
        pins
    }
})
