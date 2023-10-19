function createCard(value, isPrimarySuit) {
    return {
        value: value,
        isPrimarySuit: isPrimarySuit,
        isFaceUp: true,
        isSelected: false,
        isPresent: true,
        isSelectable: true,
        isShrunk: false,
        selectOrder: null
    }
}

function dealPins(pinsCards) {
    let pinrows = Array(4).fill([])
    pinrows[0] = pinsCards.slice(0, 4)
    pinrows[1] = pinsCards.slice(4, 7)
    pinrows[2] = pinsCards.slice(7, 9)
    pinrows[3] = pinsCards.slice(9, 10)

    return pinrows
}

function dealSolitaire(solitaireCards) {
    let cols = Array(3).fill([])
    let faceUpIndices = [4, 7, 9]
    solitaireCards.forEach((card, idx) => {
        if (!faceUpIndices.includes(idx)) {
            card.isFaceUp = false
            card.isShrunk = true
        }
    })
    cols[0] = solitaireCards.slice(0, 5)
    cols[1] = solitaireCards.slice(5, 8)
    cols[2] = solitaireCards.slice(8, 10)

    return cols
}

export function dealCards() {
    const allCards = Array(10).fill(null)
        .map((_, i) => [createCard(i + 1, true), createCard(i + 1, false)])
        .reduce((a, b) => a.concat(b), [])

    const shuffled = allCards
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    const pinsCards = shuffled.slice(0, 10)
    const solitaireCards = shuffled.slice(10, 20)

    const pins = dealPins(pinsCards)
    const solitaire = dealSolitaire(solitaireCards)

    return {
        pins,
        solitaire
    }
}