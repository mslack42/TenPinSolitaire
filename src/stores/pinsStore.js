import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialPinsState } from '../constants/initialPinsState'
import { getSelectedCardCoordinates } from '../logic/general/get-selected-pin-coordinates';
import { updatePinsSelectability } from '../logic/pins/update-selectability'

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
    const selectedPinCoords = computed(() => getSelectedCardCoordinates(pins.value))
    const coordinatesHitThisBall = ref(pinsState.coordinatesHitThisBall)

    function getState() {
        return {
            pins: pins.value,
            coordinatesHitThisBall: coordinatesHitThisBall.value
        }
    }

    function updateSelectability() {
        pins.value = updatePinsSelectability(pins.value, coordinatesHitThisBall.value)
    }

    return {
        pins,
        selectedPinCoords,
        updateSelectability
    }
})
