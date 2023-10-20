export function updateSolitaireSelectability(solitaire) {
    const selected = solitaire
        .reduce((a, b) => a.concat(b), [])
        .filter((s) => s.isSelected)

    let newSolitaire = []
    if (selected.length > 0) {
        newSolitaire = solitaire.map((col) =>
            col.map((c) => {
                c.isSelectable = c.isSelected
                return c
            })
        )
    } else {
        newSolitaire = solitaire.map((col) =>
            col.map((c) => {
                c.isSelectable = c.isFaceUp
                return c
            })
        )
    }

    return newSolitaire
}
