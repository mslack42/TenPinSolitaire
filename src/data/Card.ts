import type { Suit } from './Suit'

export interface Card {
    suit: Suit
    value: number
    isRemoved: boolean
}

export interface UICard extends Card {
    isSelectable?: boolean
    selectOrder?: number
    isFaceUp: boolean
    isBuried?: boolean
    isDecked?: boolean
    shouldDisplaySelectOrder?: boolean
}
