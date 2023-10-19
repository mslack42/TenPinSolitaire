import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue';
import { initialPinsState } from '../constants/initialPinsState'
import { getSelectedCardCoordinates } from '../logic/general/get-selected-pin-coordinates';
import { updatePinsSelectability } from '../logic/pins/update-selectability'
import { usePinsStore } from '../stores/pinsStore'
import { useSolitaireStore } from '../stores/solitaireStore'
import { dealCards } from '../logic/general/deal-cards';




export const useCentralStore = defineStore('central', () => {
    const pinsStore = usePinsStore()
    const { pins, selectedPinCoords } = storeToRefs(pinsStore)
    const solitaireStore = useSolitaireStore()
    const { solitaire, selectedCardCoords } = storeToRefs(solitaireStore)

    function dealFreshCards() {
        const dealout = dealCards()
        pins.value = dealout.pins
        solitaire.value = dealout.solitaire
    }

    return {
        dealFreshCards
    }
})
