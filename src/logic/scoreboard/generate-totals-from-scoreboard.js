export function generateTotalsFromScoreBoard(scoreboard) {
    function getNextTwoBalls(scoreboard, afterRoundN) {
        const firstScoreboard = afterRoundN < 9 ? scoreboard[afterRoundN + 1] : []
        const secondScoreboard = afterRoundN < 8 ? scoreboard[afterRoundN + 2] : []

        return firstScoreboard.concat(secondScoreboard).filter(b => b !== null).slice(0, 2)
    }

    function getArraySum(round) {
        let nonNulls = round.filter(b => b !== null)
        if (nonNulls.length === 0) {
            return null
        } else {
            return nonNulls.reduce((a, b) => a + b, 0)
        }
    }

    let roundScores = scoreboard.reduce((totals, round, index) => {
        let newTotals = totals
        let newTotal = null

        let strippedRound = round.filter(b => b !== null)
        const roundSum = getArraySum(round)
        if (index == 9) {
            //Last frame
            if (strippedRound.length === 3 || (strippedRound.length === 2 && roundSum < 10)) {
                newTotal = roundSum
            }
        } else {
            if (roundSum == 10) {
                const nextTwoBalls = getNextTwoBalls(scoreboard, index)

                if (strippedRound.length == 1 && nextTwoBalls.length >= 2) {
                    // Strike
                    newTotal = 10 + getArraySum(nextTwoBalls)
                } else if (strippedRound.length == 2 && nextTwoBalls.length >= 1) {
                    // Spare
                    newTotal = 10 + nextTwoBalls[0]
                }

            } else if (strippedRound.length >= 2) {
                newTotal = roundSum
            }
        }

        if (newTotal !== null) {
            newTotals.push(newTotal)
        }

        return newTotals
    }, [])

    let [totals, _] = roundScores.reduce(([scores, runningTotal], next) => {
        let newRunningTotal = runningTotal + next
        let newScores = scores
        newScores.push(newRunningTotal)
        return [newScores, newRunningTotal]
    }, [[], 0])

    totals = totals.concat(Array(10).fill(null)).slice(0, 10)
    return totals
}