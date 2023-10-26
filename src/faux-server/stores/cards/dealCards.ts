import type { Card } from '@/data/Card'
import type { CardColumn, PinRow } from '@/data/CardCollection'
import type { FrameDeal } from '@/data/FrameDeal'
import { Suit } from '@/data/Suit'
import random from 'random'
import seedrandom from 'seedrandom'

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

function shuffleCards(cards: Card[], seed?: String) {
    if (seed) {
        random.use(seedrandom(seed))
    }

    return cards
        .map((value) => ({ value, sort: random.float() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

export function dealCards(seed?: String): FrameDeal {
    const allCards = Array(10)
        .fill(null)
        .map((_, i) => [createCard(i + 1, Suit.Hearts), createCard(i + 1, Suit.Spades)])
        .reduce((a, b) => a.concat(b), [])

    const shuffled = shuffleCards(allCards, seed)

    const pinsCards = shuffled.slice(0, 10)
    const solitaireCards = shuffled.slice(10, 20)

    const pins = dealPins(pinsCards)
    const solitaire = dealSolitaire(solitaireCards)

    return {
        pins,
        solitaire
    }
}
