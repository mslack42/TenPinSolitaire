export function getSelectedCardCoordinates(cardCollection) {
    let coords = []

    cardCollection.forEach((row, i) => {
        row.forEach((card, j) => {
            if (card.isSelected) {
                coords.push([i, j])
            }
        })
    })

    return coords
}