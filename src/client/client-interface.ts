import type { CardColumn, PinRow, UIPinRow, UICardColumn, CardCoord } from '@/data/CardCollection'
import { useCardsStore } from './stores/cardsStore'
import type { Card, UICard } from '@/data/Card'
import type { FrameScore } from '@/data/FrameScore'
import { useScoreStore } from './stores/scoreStore'

function useStores() {
    return {
        cardStore: useCardsStore(),
        scoreStore: useScoreStore()
    }
}

export function updateClientCardsState(
    newPins: PinRow[],
    newSolitiare: CardColumn[],
    newPinCoordsHitThisBall: CardCoord[],
    newCurrentSeed: string | null
) {
    const { cardStore } = useStores()
    // Build UI data from 'backend' data
    const newUIPins: UIPinRow[] = newPins.map((pinrow) => {
        return pinrow.map((pin: Card) => {
            return pin as UICard
        })
    })
    const newUISolitaire: UICardColumn[] = newSolitiare.map((col) => {
        return col.map((c: Card) => {
            return c as UICard
        })
    })
    // Apply extended data
    // - Pins
    newUIPins.forEach((pinrow) => {
        pinrow.forEach((pin) => {
            pin.isFaceUp = true
            pin.isBuried = false
            pin.selectOrder = undefined
        })
    })
    // - Solitaire
    newUISolitaire.forEach((col) => {
        const nonNullCardCount = col.reduce((acc, card) => {
            return card.isRemoved ? acc : acc + 1
        }, 0)
        col.forEach((card, index) => {
            if (index === nonNullCardCount - 1) {
                card.isFaceUp = true
                card.isBuried = false
            } else if (index < nonNullCardCount) {
                card.isFaceUp = false
                card.isBuried = true
            }
            card.selectOrder = undefined
        })
    })
    // Insert new UI data
    cardStore.refreshCardState(newUIPins, newUISolitaire, newPinCoordsHitThisBall, newCurrentSeed)
}

export function updateClientScoreState(scoreboard: FrameScore[]) {
    const { scoreStore } = useStores()

    scoreStore.refreshScoreboard(scoreboard)
}
