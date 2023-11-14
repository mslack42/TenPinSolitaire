<template>
    <div id="appBody">
        <div class="rules-wrapper">
            <div class="paper">
                <h1>Rules</h1>
                <p>
                    In this game, you will simulate a game of Ten Pin Bowling using just 20 playing
                    cards - The ace, 2, 3, ... and 10 of two suits.
                </p>
                <p>A bowl is simulated as follows:</p>
                <ol>
                    <li>
                        Select up to 3 'pin' cards. These cards must form a contiguous group, and at
                        the start of a bowl these pins must include at least one exterior card (this
                        is where your bowling ball has first struck!)
                    </li>
                    <li>
                        Select a matching face-up card amongst the non-pin cards - the sum of values
                        of the pin cards must end in same digit as the non-pin card chosen (where
                        aces are taken to have a value of 1)
                    </li>
                    <li>
                        The selected cards are then removed, and any uncovered face-down cards are
                        flipped face-up
                    </li>
                    <li>
                        Repeat these steps until you run out of cards, valid moves, or just elect to
                        pass. On each subsequent selection, your pin selections can only start from
                        pins adjacent to those already knocked over this turn (simulating the
                        continuing trajectory of your bowling ball and pins as they topple over)
                    </li>
                </ol>
                <p>
                    If/when you pass to the next ball in a frame, all face-up non-pin cards are
                    removed. The next ball can start from any pin that is now on the exterior.
                </p>
                <p>
                    Your score for a given bowl is simply the number of 'pin' cards you remove, and
                    scoring for the entire game operates according to standard Ten Pin Bowling rules
                    (with a Spare doubling your next ball, a Strike doubling your next two balls,
                    and the potential for 3 balls in the last frame)
                </p>
                <p>After 10 frames, the game is over!</p>
            </div>
        </div>
        <div class="button-wrapper">
            <ActionButton action-type="NoConsequenceAction" @clicked="$router.push('/')">
                Game Menu
            </ActionButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActionButton from '../common/ActionButton.vue'
const $router = useRouter()
</script>

<style scoped>
#appBody {
    min-height: 650px;
    max-height: 800px;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    gap: 10px;
}

.rules-wrapper {
    margin: 5px 10px;
    max-height: 550px;
    overflow-y: scroll;
}
.paper {
    background-color: rgb(245, 244, 244);
    padding: 5px 10px;
    border-style: solid 10px black;
    border-radius: 15px;
    box-shadow: 2px 2px 1px 1px gray;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 20px 0px 10px 0px;
}
</style>
