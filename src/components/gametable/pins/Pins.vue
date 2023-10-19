<script setup>
import Card from '../Card.vue';
import { ref } from 'vue'
import { testPinCards } from '../../test/testPinCards'

const cards = ref(testPinCards)

</script>

<template>
    <div class="tenpins">
        <div class="pinrow">
            <Card v-bind="cards[0]"></Card>
            <Card v-bind="cards[1]"></Card>
            <Card v-bind="cards[2]"></Card>
            <Card v-bind="cards[3]"></Card>
        </div>
        <div class="pinrow">
            <Card v-bind="cards[4]"></Card>
            <Card v-bind="cards[5]"></Card>
            <Card v-bind="cards[6]"></Card>
        </div>
        <div class="pinrow">
            <Card v-bind="cards[7]"></Card>
            <Card v-bind="cards[8]"></Card>
        </div>
        <div class="pinrow">
            <Card v-bind="cards[9]"></Card>
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
