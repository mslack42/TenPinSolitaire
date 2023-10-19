import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { initialPinsState } from '../constants/initialPinsState'
import { getSelectedCardCoordinates } from '../logic/general/get-selected-pin-coordinates';
import { updatePinsSelectability } from '../logic/pins/update-selectability'

const storageKey = 'pins'

export const usePinsStore = defineStore(storageKey, () => {
    const pins = ref(initialPinsState.pins)
    const selectedPinCoords = computed(() => getSelectedCardCoordinates(pins.value))
    const coordinatesHitThisBall = ref([])

    function updateSelectability() {
        pins.value = updatePinsSelectability(pins.value, coordinatesHitThisBall.value)
    }

    return {
        pins,
        coordinatesHitThisBall,
        selectedPinCoords,
        updateSelectability
    }
})
