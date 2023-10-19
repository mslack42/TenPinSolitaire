export function getMissingPinCoords(cardCollection) {
    let coords = []

    cardCollection.forEach((row, i) => {
        row.forEach((card, j) => {
            if (!card.isPresent) {
                coords.push([i, j])
            }
        })
    })

    return coords
}