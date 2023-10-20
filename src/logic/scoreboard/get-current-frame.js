export function getCurrentFrame(scoreboard) {
    return scoreboard.reduce((out, r) => {
        if (r.length == 2) {
            if (r[0] !== null && r[1] !== null) {
                // Current frame is all filled in
                return out + 1
            }
            if (r[0] == 10) {
                //  Current frame a strike
                return out + 1
            }
            if (r[0] !== null) {
                // Current frame, ball 1
                return out
            }
            // Current frame, ball 2
            return out
        }
        if (r.length == 3) {
            if (r[0] === null) {
                // Current frame, ball 1
                return out
            }
            if (r[1] === null) {
                // Current frame, ball 2
                return out
            }
            if ((r[0] + r[1]) % 10 === 0 && r[3] === null) {
                // Current frame, ball 3
                return out
            }
            return out + 1
        }
    }, 0)
}

export function getCurrentFrameBall(scoreboard) {
    const frameIndex = getCurrentFrame(scoreboard)
    const currentFrame = scoreboard[frameIndex]

    if (currentFrame[0] === null) {
        return 0
    }
    if (currentFrame[0] !== 10 && currentFrame[1] === null) {
        return 1
    }
    if (
        (currentFrame[0] + currentFrame[1]) % 10 === 0 &&
        currentFrame[2] === null
    ) {
        return 2
    }
    return null
}
