<script setup>
import Card from '../Card.vue';
import { ref } from 'vue'
import { testSolitaireCards } from '../../test/testSolitaireCards'

const cards = ref(testSolitaireCards)

</script>

<template>
    <div class="solitaire">
        <div class="cardcol">
            <Card v-bind="cards[0]"></Card>
            <Card v-bind="cards[1]"></Card>
            <Card v-bind="cards[2]"></Card>
            <Card v-bind="cards[3]"></Card>
            <Card v-bind="cards[4]"></Card>
        </div>
        <div class="cardcol">
            <Card v-bind="cards[5]"></Card>
            <Card v-bind="cards[6]"></Card>
            <Card v-bind="cards[7]"></Card>
        </div>
        <div class="cardcol">
            <Card v-bind="cards[8]"></Card>
            <Card v-bind="cards[9]"></Card>
        </div>
    </div>
</template>

<style scoped>
.solitaire {
    display: flex;
    justify-content: center;
    width: 300px;
}

.cardcol {
    display: flex;
    align-items: start;
    flex-direction: column;
}
</style>
