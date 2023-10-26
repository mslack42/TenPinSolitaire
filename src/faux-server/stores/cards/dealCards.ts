import type { Card } from '@/data/Card'
import type { CardColumn, PinRow } from '@/data/CardCollection'
import type { FrameDeal } from '@/data/FrameDeal'
import { Suit } from '@/data/Suit'

function createCard(value: number, suit: Suit): Card {
    return {
        value,
        suit,
        isRemoved: false
    }
}

function dealPins(pinsCards: Card[]) {
    const pinrows: PinRow[] = Array(4).fill([])
    pinrows[0] = pinsCards.slice(0, 4)
    pinrows[1] = pinsCards.slice(4, 7)
    pinrows[2] = pinsCards.slice(7, 9)
    pinrows[3] = pinsCards.slice(9, 10)

    return pinrows
}

function dealSolitaire(solitaireCards: Card[]) {
    const cols: CardColumn[] = Array(3).fill([])
    cols[0] = solitaireCards.slice(0, 5)
    cols[1] = solitaireCards.slice(5, 8)
    cols[2] = solitaireCards.slice(8, 10)

    return cols
}

export function dealCards(): FrameDeal {
    const allCards = Array(10)
        .fill(null)
        .map((_, i) => [createCard(i + 1, Suit.Hearts), createCard(i + 1, Suit.Spades)])
        .reduce((a, b) => a.concat(b), [])

    const shuffled = allCards
        .map((value) => ({ value, sort: Math.random() }))
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
