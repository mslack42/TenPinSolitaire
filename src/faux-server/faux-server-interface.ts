import type { CardCoord } from '@/data/CardCollection'
import { useCardsStore } from './stores/cardsStore'
import { useCoordinationStore } from './stores/coordinationStore'
import { useScoreboardStore } from './stores/scoreBoard'

function useStores() {
    return {
        cardStore: useCardsStore(),
        scoreboardStore: useScoreboardStore(),
        coordinationStore: useCoordinationStore()
    }
}

export function initialiseGame(seed?: String) {
    console.log(seed)
    const { cardStore, scoreboardStore, coordinationStore } = useStores()
    // Determine all deals for the game, and deal out the first set
    cardStore.resetShuffleSeed(seed)
    cardStore.generateAllFrameDeals()
    cardStore.freshDeal()
    // Reset the scoreboard
    scoreboardStore.resetScoreboard()
    // Reset the coordination
    coordinationStore.resetCoordination()
}

export function bowlSelection(
    selectedPinCoords: CardCoord[],
    selectedSolitaireCoords: CardCoord[]
) {
    const { cardStore } = useStores()

    // cardStore remove cards
    cardStore.removeCards(selectedPinCoords, selectedSolitaireCoords)

    // check if we've cleared the board - if so
    //  - scoreboardStore Update Scoreboard
    //  - coordinationStore Update to the next frame/ball/etc. or end the game
    if (cardStore.numberOfPinsRemaining === 0) {
        passToNextBall()
    }
}

export function passToNextBall() {
    const { cardStore, scoreboardStore, coordinationStore } = useStores()

    const startingFrame = coordinationStore.currentFrame
    // scoreboardStore Update Scoreboard
    scoreboardStore.updateScoreboard(
        startingFrame,
        coordinationStore.currentBall,
        cardStore.pinCoordsHitThisBall.length
    )
    // coordinationStore Update to next frame/ball/etc. or end the game
    coordinationStore.goToNext(scoreboardStore.scoreboard)
    const nextFrame = coordinationStore.currentFrame

    if (nextFrame !== startingFrame || cardStore.numberOfPinsRemaining === 0) {
        cardStore.freshDeal()
    } else {
        // Remove top solitaire cards
        cardStore.removeTopSolitaireCards()
    }
}
