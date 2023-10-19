<script setup>
import Card from '../Card.vue';
import { usePinsStore } from '../../../stores/pinsStore'
import { storeToRefs } from 'pinia';

const pinsStore = usePinsStore()
const { pins } = storeToRefs(pinsStore)

</script>

<template>
    <div class="tenpins">
        <div class="pinrow" v-for="pinrow in pins">
            <Card v-for="pin in pinrow" v-bind="pin"></Card>
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
