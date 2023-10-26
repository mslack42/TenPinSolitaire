import type { CardColumn, CardCoord, PinRow } from '@/data/CardCollection'
import type { FrameDeal } from '@/data/FrameDeal'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { dealAllFrames } from './cards/dealAllFrames'
import { updateClientCardsState } from '@/client/client-interface'

export const useCardsStore = defineStore('serverCards', () => {
    const _pins = ref<PinRow[]>([])
    const pins = computed<PinRow[]>(() => _pins.value)
    const _solitaire = ref<CardColumn[]>([])
    const solitaire = computed<CardColumn[]>(() => _solitaire.value)
    const _pinCoordsHitThisBall = ref<CardCoord[]>([])
    const pinCoordsHitThisBall = computed<CardCoord[]>(() => _pinCoordsHitThisBall.value)
    const _allFrameDeals = ref<FrameDeal[]>([])
    const _nextDealIndex = ref(0)
    const numberOfPinsRemaining = computed(
        () => pins.value.reduce((a, b) => a.concat(b), []).filter((p) => !p.isRemoved).length
    )
    const _seed = ref<string | null>(null)
    const seed = computed<string | null>(() => _seed.value)

    function generateAllFrameDeals() {
        const seedStr = seed.value && seed.value !== '' ? seed.value : null
        _allFrameDeals.value = dealAllFrames(seedStr ? seedStr : undefined)
        _nextDealIndex.value = 0
    }

    function resetShuffleSeed(newSeed?: string) {
        if (newSeed && newSeed !== '') {
            _seed.value = newSeed
        } else {
            _seed.value = null
        }
    }

    function updateClientCardStateFromServer() {
        updateClientCardsState(
            pins.value,
            solitaire.value,
            pinCoordsHitThisBall.value,
            seed.value ? (seed.value as string) : null
        )
    }

    function freshDeal() {
        const nextDeal = _allFrameDeals.value[_nextDealIndex.value]
        _nextDealIndex.value = _nextDealIndex.value + 1
        _pins.value = nextDeal?.pins!
        _solitaire.value = nextDeal?.solitaire!
        _pinCoordsHitThisBall.value = []

        updateClientCardStateFromServer()
    }

    function removeCards(pinsToRemove: CardCoord[], solitaireToRemove: CardCoord[]) {
        pinsToRemove.forEach((coord) => {
            const [x, y] = coord
            _pins.value[x][y].isRemoved = true
        })
        solitaireToRemove.forEach((coord) => {
            const [x, y] = coord
            _solitaire.value[x][y].isRemoved = true
        })
        _pinCoordsHitThisBall.value = _pinCoordsHitThisBall.value.concat(pinsToRemove)

        updateClientCardStateFromServer()
    }

    function removeTopSolitaireCards() {
        const topCardIndices = solitaire.value.map((col) =>
            col.reduce((acc, card) => (card.isRemoved ? acc : acc + 1), -1)
        )
        topCardIndices.forEach((tci, colIdx) => {
            if (tci > -1) {
                _solitaire.value[colIdx][tci].isRemoved = true
            }
        })
        _pinCoordsHitThisBall.value = []

        updateClientCardStateFromServer()
    }

    watch([pins, solitaire, pinCoordsHitThisBall], () => {
        updateClientCardStateFromServer()
    })

    return {
        pins,
        solitaire,
        pinCoordsHitThisBall,
        numberOfPinsRemaining,
        seed,
        resetShuffleSeed,
        freshDeal,
        generateAllFrameDeals,
        removeCards,
        removeTopSolitaireCards
    }
})
