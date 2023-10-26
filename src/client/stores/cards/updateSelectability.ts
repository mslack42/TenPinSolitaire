import type { CardCoord, UICardColumn, UIPinRow } from '@/data/CardCollection'
import { getSelectedCardCoordinates } from './getSelectedCardCoordinates'
import { getMissingPinCoords } from './getMissingPinCoords'
import { getPinCoordsNeighbourhood } from './getAdjacentPins'
import type { UICard } from '@/data/Card'

function toString(coord: CardCoord) {
    return coord.join(',')
}
function fromString(coordStr: String) {
    return coordStr.split(',').map(Number)
}
function calculatePinsSelectability(pins: UIPinRow[], coordinatesHitSoFar: CardCoord[]) {
    const selectedPinCoords = getSelectedCardCoordinates(pins)
    const initialSelectableCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [0, 3],
        [1, 2],
        [2, 1]
    ]

    let selectableCoords = []
    const missingPinCoords = getMissingPinCoords(pins)
    if (selectedPinCoords.length == 0) {
        if (coordinatesHitSoFar.length == 0 && missingPinCoords.length == 0) {
            // Just the outermost pins
            selectableCoords = initialSelectableCoords
        } else if (coordinatesHitSoFar.length == 0) {
            const gapCoords = getPinCoordsNeighbourhood(missingPinCoords)
            const externalCoords = initialSelectableCoords
            selectableCoords = [...new Set(gapCoords.concat(externalCoords).map(toString))].map(
                fromString
            )
        } else {
            // Need to
            // - Find neighbourhood of pins hit already
            const nbhdCoords = getPinCoordsNeighbourhood(coordinatesHitSoFar)
            // - Filter out any missing pins
            selectableCoords = nbhdCoords.filter((c) => !missingPinCoords.includes(c))
        }
    } else {
        // Need to
        //  - Find pins adjacent to already selected pins
        const nbhdCoords = getPinCoordsNeighbourhood(selectedPinCoords)
        // - Filter out any missing pins
        selectableCoords = nbhdCoords
            .map(toString)
            .filter((c) => !missingPinCoords.map(toString).includes(c))
            .map(fromString)
    }

    pins.forEach((row) => {
        row.forEach((pin) => {
            if (pin) {
                pin!.isSelectable = false
            }
        })
    })
    if (selectedPinCoords.length < 3) {
        selectableCoords.forEach((c) => {
            const [x, y] = c
            pins[x][y]!.isSelectable = true
        })
    }
    selectedPinCoords.forEach((c) => {
        const [x, y] = c
        const pin = pins[x][y]
        if (pin!.selectOrder === selectedPinCoords.length) {
            // Only the latest selected pin should be de-selectable. Otherwise, cheddar is possible
            pin!.isSelectable = true
        }
    })

    return pins
}

function updateSolitaireSelectability(
    solitaire: UICardColumn[],
    pendingBallVal: number,
    selected: UICard[],
    hasSelectedPins: boolean
) {
    let newSolitaire = []
    if (selected.length > 0) {
        newSolitaire = solitaire.map((col) =>
            col.map((c) => {
                if (c) {
                    c.isSelectable = c.selectOrder !== undefined
                }
                return c
            })
        )
    } else {
        newSolitaire = solitaire.map((col) =>
            col.map((c) => {
                if (c) {
                    c.isSelectable =
                        hasSelectedPins && c.isFaceUp && (c.value - pendingBallVal) % 10 === 0
                }
                return c
            })
        )
    }

    return newSolitaire
}

function lockDownPinBoard(pins: UIPinRow[]) {
    pins.forEach((row) => {
        row.forEach((pin) => {
            if (pin) {
                pin.isSelectable = false
            }
        })
    })
}

export function updateSelectability(
    pins: UIPinRow[],
    solitaire: UICardColumn[],
    pinCoordsHitThisBall: CardCoord[]
) {
    const selectedSolitaireCards = solitaire
        .reduce((a, b) => a.concat(b), [])
        .filter((s) => s !== null)
        .filter((s) => s!.selectOrder !== undefined && s!.selectOrder !== null) as UICard[]
    if (selectedSolitaireCards.length > 0) {
        lockDownPinBoard(pins)
    } else {
        calculatePinsSelectability(pins, pinCoordsHitThisBall)
    }
    const selectedPins = getSelectedCardCoordinates(pins)
    const pendingBallVal = selectedPins.reduce((acc, coord) => {
        const [x, y] = coord
        const cardValue = pins[x][y]?.value ?? 0
        return (acc + cardValue) % 10
    }, 0)
    updateSolitaireSelectability(
        solitaire,
        pendingBallVal,
        selectedSolitaireCards,
        selectedPins.length > 0
    )
}
