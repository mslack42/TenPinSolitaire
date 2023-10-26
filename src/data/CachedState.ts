import type { CardColumn, CardCoord, PinRow } from './CardCollection'
import type { FrameScore } from './FrameScore'

export interface CardState {
    _pins: PinRow[]
    _solitaire: CardColumn[]
    _pinCoordsHitThisBall: CardCoord[]
    _seed: string | null
}

export interface CoordState {
    _currentFrame: number
    _currentBall: number
}

export interface ScoreState {
    _scoreboard: FrameScore[]
}

export interface CachedState {
    cards: CardState
    coord: CoordState
    score: ScoreState
}