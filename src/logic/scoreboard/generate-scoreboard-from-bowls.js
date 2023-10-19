
export function generateScoreboardFromBowls(bowls) {
    const placedNumbers = bowls.reduce((scoreboard, bowl) => {
        let newScoreboard = scoreboard
        const latestRoundIndex = scoreboard.length - 1
        if (latestRoundIndex === -1) {
            return [[bowl]]
        }
        let latestRound = scoreboard[latestRoundIndex]
        if (latestRoundIndex < 9) {
            if (latestRound.length == 2 || latestRound[0] == 10) {
                newScoreboard.push([bowl])
            } else {

                newScoreboard[latestRoundIndex].push(bowl)
            }
        }
        if (latestRoundIndex === 9 &&
            (latestRound.length == 2 && latestRound[0] + latestRound[1] >= 10
                || latestRound.length == 1)) {
            newScoreboard[latestRoundIndex].push(bowl)
        }
        return newScoreboard
    }, [])

    const paddedForAllRounds = placedNumbers.concat(Array(10).fill([])).slice(0, 10)
    const paddedEachRound = paddedForAllRounds.map((r, idx) => r.concat(Array(idx === 9 ? 3 : 2).fill(null)).slice(0, idx === 9 ? 3 : 2))

    return paddedEachRound
}