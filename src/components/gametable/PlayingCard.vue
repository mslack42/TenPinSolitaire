<script setup>
import { computed } from 'vue'

const props = defineProps({
    value: Number,
    isPrimarySuit: Boolean,
    isFaceUp: Boolean,
    isSelected: Boolean,
    isPresent: Boolean,
    isSelectable: Boolean,
    isShrunk: Boolean,
    selectOrder: Number
})

const suitColour = computed(() => (props.isPrimarySuit ? 'red' : 'black'))
const classes = computed(() =>
    [
        props.isFaceUp ? 'faceup ' : 'facedown ',
        props.isSelected ? 'selected ' : '',
        props.isPresent ? '' : 'notpresent ',
        props.isSelectable ? 'selectable ' : '',
        props.isShrunk ? 'shrunk ' : ''
    ]
        .join('')
        .trim()
)

const emit = defineEmits(['selected', 'deselected'])

function handleClick() {
    const event = props.isSelected ? 'deselected' : 'selected'
    emit(event)
}
</script>

<template>
    <div class="card-wrapper" :class="classes">
        <div class="card-aura">
            <div
                v-if="isFaceUp && isPresent"
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

<style scoped>
.card-wrapper {
    margin: 5px 10px;
    height: 60px;
    width: 40px;
    border-color: black;
    border: 2px;
    border-style: solid;
}

.card-wrapper.notpresent {
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
