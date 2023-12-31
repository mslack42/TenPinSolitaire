import type { CardColumn, CardCoord, PinRow } from './CardCollection'
import type { FrameDeal } from './FrameDeal'
import type { FrameScore } from './FrameScore'

export interface CardState {
    _pins: PinRow[]
    _solitaire: CardColumn[]
    _pinCoordsHitThisBall: CardCoord[]
    _seed: string | null
    _allFrameDeals: FrameDeal[]
    _nextDealIndex: number
}

export interface CoordState {
    _currentFrame: number
    _currentBall: number
    isGameOver: boolean
}

export interface ScoreState {
    _scoreboard: FrameScore[]
}

export interface CachedState {
    cards: CardState
    coord: CoordState
    score: ScoreState
}
