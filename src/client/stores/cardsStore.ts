import type { CardCoord, UICardColumn, UIPinRow } from '@/data/CardCollection'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getSelectedCardCoordinates } from './cards/getSelectedCardCoordinates'
import type { UICard } from '@/data/Card'
import { updateSelectability } from './cards/updateSelectability'
import { Suit } from '@/data/Suit'

export const useCardsStore = defineStore('clientCards', () => {
    const pins = ref<UIPinRow[]>([])
    const solitaire = ref<UICardColumn[]>([])
    const pinCoordsHitThisBall = ref<CardCoord[]>([])
    const currentSeed = ref<string | null>(null)
    const discards = computed<UICard[]>(() => {
        const discardedSolitaire = solitaire.value
            .reduce((col1, col2) => col1.concat(col2), [])
            .filter((c) => c.isRemoved)
        const discardedPins = pins.value
            .reduce((row1, row2) => row1.concat(row2), [])
            .filter((c) => c.isRemoved)
        const allDiscards = discardedSolitaire.concat(discardedPins).sort((a, b) => {
            if (a.suit !== b.suit) {
                return a.suit == Suit.Hearts ? 1 : -1
            } else {
                return a.value - b.value
            }
        })
        return allDiscards
    })

    const selectedPinsCoords = computed<CardCoord[]>(() => getSelectedCardCoordinates(pins.value))
    const selectedSolitaireCoords = computed<CardCoord[]>(() =>
        getSelectedCardCoordinates(solitaire.value)
    )
    const pinSum = computed(() =>
        selectedPinsCoords.value.map((p) => pins.value[p[0]][p[1]].value).reduce((a, b) => a + b, 0)
    )
    const solitaireSum = computed(() =>
        selectedSolitaireCoords.value
            .map((s) => solitaire.value[s[0]][s[1]].value)
            .reduce((a, b) => a + b, 0)
    )
    const hasValidSelection = computed(
        () =>
            selectedPinsCoords.value.length > 0 &&
            selectedSolitaireCoords.value.length > 0 &&
            (pinSum.value - solitaireSum.value) % 10 === 0
    )

    function refreshCardState(
        newPins: UIPinRow[],
        newSolitaire: UICardColumn[],
        newPinCoordsHitThisBall: CardCoord[],
        newCurrentSeed: string | null
    ) {
        pins.value = newPins
        solitaire.value = newSolitaire
        pinCoordsHitThisBall.value = newPinCoordsHitThisBall
        currentSeed.value = newCurrentSeed
        updateSelectability(pins.value, solitaire.value, pinCoordsHitThisBall.value)
    }

    function selectPin(pin: UICard) {
        if (pin.selectOrder === null || pin.selectOrder === undefined) {
            pin.selectOrder = selectedPinsCoords.value.length + 1
        } else {
            pin.selectOrder = undefined
        }
        updateSelectability(pins.value, solitaire.value, pinCoordsHitThisBall.value)
    }

    function selectSolitaireCard(card: UICard) {
        if (card.selectOrder === null || card.selectOrder === undefined) {
            card.selectOrder = selectedSolitaireCoords.value.length + 1
        } else {
            card.selectOrder = undefined
        }
        updateSelectability(pins.value, solitaire.value, pinCoordsHitThisBall.value)
    }

    function clearSelection() {
        pins.value.forEach((pinrow) => {
            pinrow.forEach((pin) => {
                pin.selectOrder = undefined
            })
        })
        solitaire.value.forEach((col) => {
            col.forEach((card) => {
                card.selectOrder = undefined
            })
        })

        updateSelectability(pins.value, solitaire.value, pinCoordsHitThisBall.value)
    }

    return {
        pins,
        solitaire,
        selectedPinsCoords,
        selectedSolitaireCoords,
        hasValidSelection,
        currentSeed,
        discards,
        refreshCardState,
        selectPin,
        selectSolitaireCard,
        clearSelection
    }
})
