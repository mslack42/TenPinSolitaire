<script setup>
import Card from '../PlayingCard.vue'
import { usePinsStore } from '../../../stores/pinsStore'
import { storeToRefs } from 'pinia'

const pinsStore = usePinsStore()
const { pins, selectedPinCoords } = storeToRefs(pinsStore)

function toggleSelected(pin) {
    pin.isSelected = !pin.isSelected
    if (pin.isSelected) {
        pin.selectOrder = selectedPinCoords.value.length
    }
    pinsStore.updateSelectability()
}
</script>

<template>
    <div class="tenpins">
        <div class="pinrow" v-for="(pinrow, x) in pins" :key="x">
            <Card
                v-for="(pin,y) in pinrow"
                v-bind="pin"
                @selected="toggleSelected(pin)"
                @deselected="toggleSelected(pin)"
                :key="y"
            >
            </Card>
        </div>
    </div>
</template>

<style scoped>
.tenpins {
    width: 300px;
}

.pinrow {
    display: flex;
    justify-content: center;
}
</style>
