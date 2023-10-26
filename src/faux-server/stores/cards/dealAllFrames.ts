import type { FrameDeal } from '@/data/FrameDeal'
import { dealCards } from './dealCards'

export function dealAllFrames(): FrameDeal[] {
    return Array(12)
        .fill(null)
        .map(() => dealCards())
}
