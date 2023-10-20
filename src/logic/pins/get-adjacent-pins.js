export function getPinCoordNeighbourhood(coord) {
    const [x, y] = coord

    const candidateNeighbourhood = [
        // Upper row
        [x - 1, y],
        [x - 1, y + 1],
        // Same row
        [x, y - 1],
        [x, y + 1],
        // Lower row
        [x + 1, y - 1],
        [x + 1, y]
    ]

    return candidateNeighbourhood
        .filter((pair) => pair[0] >= 0 && pair[1] >= 0)
        .filter((pair) => pair[0] + pair[1] <= 3)
}

export function getPinCoordsNeighbourhood(coords) {
    function toString(coord) {
        return coord.join(',')
    }
    function fromString(coordStr) {
        return coordStr.split(',').map(Number)
    }

    let candidates = coords
        .map((c) => getPinCoordNeighbourhood(c))
        .map((nbhd) => nbhd.map(toString))
        .reduce((a, b) => a.concat(b), [])
    candidates = [...new Set(candidates)]

    const coordsStrs = coords.map(toString)
    candidates = candidates.filter((c) => !coordsStrs.includes(c))

    return candidates.map(fromString)
}
