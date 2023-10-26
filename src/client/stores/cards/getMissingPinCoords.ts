import type { CardCoord, UICardCollection } from '@/data/CardCollection'

export function getMissingPinCoords(cardCollection: UICardCollection) {
    const coords: CardCoord[] = []

    cardCollection.forEach((row, i) => {
        row.forEach((card, j) => {
            if (card.isRemoved) {
                coords.push([i, j])
            }
        })
    })

    return coords
}
