<script setup lang="ts">
import { computed } from 'vue'
import type { UICard } from '../../../data/Card'
import { Suit } from '../../../data/Suit'

const props = defineProps<UICard>()

const suitColour = computed(() => (props?.suit === Suit.Hearts ? 'red' : 'black'))
const suitClass = computed(() => (props?.suit === Suit.Hearts ? 'heart' : 'spade'))
const isSelected = computed(() => props?.selectOrder !== undefined && props?.selectOrder !== null)
const classes = computed(() =>
    [
        props?.isFaceUp ? 'faceup ' : 'facedown ',
        isSelected.value ? 'selected ' : '',
        props?.isSelectable ? 'selectable ' : '',
        props.isRemoved ? 'removed ' : '',
        props?.isBuried ? 'buried ' : '',
        props?.isDecked ? 'decked ' : ''
    ]
        .join('')
        .trim()
)

const emit = defineEmits(['selected', 'deselected'])

function handleClick() {
    const event = isSelected.value ? 'deselected' : 'selected'
    emit(event)
}

function displayCardValue(value: number) {
    if (value === 1) {
        return 'A'
    } else {
        return String(value)
    }
}
</script>

<template>
    <div class="card-wrapper" :class="classes">
        <div class="card-aura">
            <div
                v-if="isFaceUp && !isRemoved"
                class="card"
                v-on="{ click: isSelectable ? handleClick : null }"
            >
                <div class="card-contents">
                    <div class="suit upper" :class="suitClass"></div>
                    <div class="card-value">
                        {{ displayCardValue(value) }}
                    </div>
                    <div class="suit lower" :class="suitClass"></div>
                </div>
            </div>
            <div v-if="!isFaceUp && !isRemoved">
                <div class="card-reverse">
                    <div class="card-logo"></div>
                </div>
            </div>
            <div class="card-select-order" v-if="isSelected && shouldDisplaySelectOrder">
                {{ selectOrder }}
            </div>
        </div>
    </div>
</template>

<style>
.card-wrapper {
    position: relative;
    height: 60px;
    width: 40px;
    border-color: black;
    border: 2px;
    border-style: solid;
}

.card-wrapper.removed {
    visibility: hidden;
}

.selectable .card-aura {
    box-shadow: 0px 0px 5px 5px cyan;
}

.selected .card-aura {
    box-shadow: 0px 0px 5px 5px magenta;
}

.card-select-order {
    position: absolute;
    bottom: 1px;
    left: 1px;
    color: magenta;
}

.suit.heart {
    background-image: url('../../../assets/heart.svg');
}

.suit.spade {
    background-image: url('../../../assets/spade.svg');
}

.suit {
    position: absolute;
    font-size: 0.8em;
    height: 15px;
    width: 15px;
}

.suit.upper {
    top: 0px;
    left: 0px;
}

.suit.lower {
    bottom: 0px;
    right: 0px;
}

.card-wrapper.buried {
    overflow-y: visible;
    margin-bottom: -50px;
}

.card-wrapper.decked {
    overflow-y: visible;
    margin-bottom: -60px;
}

.card-wrapper.facedown {
    background-color: blue;
}

.card-wrapper.faceup {
    background-color: white;
}

.card-reverse {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}

.card-logo {
    height: 40px;
    width: 40px;
    background-image: url('../../../assets/bowling.svg');
    text-align: center;
    vertical-align: middle;
}

.card-aura {
    height: 100%;
    width: 100%;
    border: 5px;
}

.card {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
}

.card-contents {
    font-size: 25px;
    font-family: sans-serif;
    color: v-bind(suitColour);
    width: 100%;
    text-align: center;
    vertical-align: middle;
}
</style>
