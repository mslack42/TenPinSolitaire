import type { FrameScore } from '@/data/FrameScore'

function getNextMBalls(scoreBoard: FrameScore[], afterRoundN: number, m: number) {
    const firstBalls = afterRoundN < 9 ? scoreBoard[afterRoundN + 1].balls : []
    const secondBalls = afterRoundN < 8 ? scoreBoard[afterRoundN + 2].balls : []

    const combined = firstBalls.concat(secondBalls).filter((b) => b !== null)
    if (combined.length >= m) {
        return {
            hasMBalls: true,
            nextBalls: combined.slice(0, m)
        }
    } else {
        return {
            hasMBalls: false,
            nextBalls: []
        }
    }
}

function getArraySum(round: (number | null)[]) {
    const nonNulls: number[] = round.filter((b) => b !== null) as number[]
    if (nonNulls.length === 0) {
        return null
    } else {
        return nonNulls.reduce((a, b) => a + b, 0)
    }
}

export function applyRunningTotals(scoreBoard: FrameScore[]) {
    const roundScores = scoreBoard.reduce((totals, frame, idx) => {
        const newTotals: number[] = totals
        const roundSum = getArraySum(frame.balls)
        const nonNullBalls = frame.balls.filter((b) => b !== null)
        if (idx == 9) {
            //Last Frame logic
            if (nonNullBalls.length === 3 || (nonNullBalls.length === 2 && (roundSum ?? 0) < 10)) {
                newTotals.push(roundSum ?? 0)
            }
        } else {
            if (roundSum === 10) {
                // Strike : 3 - 1 = 2
                // Spare  : 3 - 2 = 1
                const numberOfBallsToConsider = 3 - nonNullBalls.length
                const { hasMBalls, nextBalls } = getNextMBalls(
                    scoreBoard,
                    idx,
                    numberOfBallsToConsider
                )
                if (hasMBalls) {
                    newTotals.push(10 + (getArraySum(nextBalls) ?? 0))
                }
            } else if (nonNullBalls.length >= 2) {
                newTotals.push(roundSum ?? 0)
            }
        }
        return newTotals
    }, [] as number[])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let [totals, _] = roundScores.reduce(
        ([scores, runningTotal], next) => {
            const newRunningTotal = runningTotal + next
            const newScores = scores
            newScores.push(newRunningTotal)
            return [newScores, newRunningTotal]
        },
        [[] as number[], 0]
    )

    // Pad with nulls
    totals = totals.concat(Array(10).fill(null)).slice(0, 10)

    return scoreBoard.map((f, idx) => {
        f.frameRunningTotal = totals[idx]
        return f
    })
}
