import type { CardCoord, UICardCollection } from '@/data/CardCollection'

export function getSelectedCardCoordinates(cardCollection: UICardCollection) {
    const coords: CardCoord[] = []

    cardCollection.forEach((row, i) => {
        row.forEach((card, j) => {
            if (card.selectOrder !== null && card.selectOrder !== undefined) {
                coords.push([i, j])
            }
        })
    })

    return coords
}
