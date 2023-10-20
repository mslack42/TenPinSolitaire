import { getSelectedCardCoordinates } from '../general/get-selected-pin-coordinates'
import { getMissingPinCoords } from './get-missing-pin-coordinates'
import { getPinCoordsNeighbourhood } from './get-adjacent-pins'

export function updatePinsSelectability(pins, coordinatesHitSoFar) {
    function toString(coord) {
        return coord.join(',')
    }
    function fromString(coordStr) {
        return coordStr.split(',').map(Number)
    }

    const selectedPinCoords = getSelectedCardCoordinates(pins);
    selectedPinCoords.forEach(c => {
        // Numbering the selected pins, to prevent cheese later
        const [x, y] = c
        const pin = pins[x][y]
        if (pin.selectOrder === null) {
            pin.selectOrder = selectedPinCoords.length
        }
    })

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
            selectableCoords = [...new Set(gapCoords.concat(externalCoords).map(toString))].map(fromString)
        } else {
            // Need to
            // - Find neighbourhood of pins hit already
            const nbhdCoords = getPinCoordsNeighbourhood(coordinatesHitSoFar)
            // - Filter out any missing pins
            selectableCoords = nbhdCoords.filter(c => !missingPinCoords.includes(c))
        }
    } else {
        // Need to
        //  - Find pins adjacent to already selected pins
        const nbhdCoords = getPinCoordsNeighbourhood(selectedPinCoords)
        // - Filter out any missing pins
        selectableCoords = nbhdCoords.map(toString).filter(c => !missingPinCoords.map(toString).includes(c)).map(fromString)
    }

    pins.forEach(row => {
        row.forEach(pin => pin.isSelectable = false)
    })
    if (selectedPinCoords.length < 3) {
        selectableCoords.forEach(c => {
            const [x, y] = c
            pins[x][y].isSelectable = true
        })
    }
    selectedPinCoords.forEach(c => {
        const [x, y] = c
        const pin = pins[x][y]
        if (pin.selectOrder === selectedPinCoords.length) {
            // Only the latest selected pin should be de-selectable. Otherwise, cheddar is possible
            pin.isSelectable = true
        }
    })

    return pins
}