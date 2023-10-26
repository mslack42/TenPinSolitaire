<script setup lang="ts">
import { computed } from 'vue'
import type { UICard } from '../../../data/Card'
import { Suit } from '../../../data/Suit'

const props = defineProps<UICard>()

const suitColour = computed(() => (props?.suit === Suit.Hearts ? 'red' : 'black'))
const isSelected = computed(() => props?.selectOrder !== undefined && props?.selectOrder !== null)
const classes = computed(() =>
    [
        props?.isFaceUp ? 'faceup ' : 'facedown ',
        isSelected.value ? 'selected ' : '',
        props?.isSelectable ? 'selectable ' : '',
        props.isRemoved ? 'removed ' : '',
        props?.isBuried ? 'shrunk ' : ''
    ]
        .join('')
        .trim()
)

const emit = defineEmits(['selected', 'deselected'])

function handleClick() {
    const event = isSelected.value ? 'deselected' : 'selected'
    emit(event)
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
                    {{ value }}
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card-wrapper {
    margin: 5px 10px;
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

.card-wrapper.shrunk {
    height: 20px;
    margin: 1px 10px;
}

.card-wrapper.facedown {
    background-color: blue;
}

.card-wrapper.faceup {
    background-color: white;
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
    color: v-bind(suitColour);
    width: 100%;
    text-align: center;
    vertical-align: middle;
}
</style>
