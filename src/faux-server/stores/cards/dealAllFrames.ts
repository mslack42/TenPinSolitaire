import type { FrameDeal } from '@/data/FrameDeal'
import { dealCards } from './dealCards'

export function dealAllFrames(seed?: string): FrameDeal[] {
    return Array(12)
        .fill(null)
        .map((_, idx) => dealCards(seed ? ((seed + String(idx)) as string) : undefined))
}
