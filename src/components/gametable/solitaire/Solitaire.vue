<script setup>
import Card from '../Card.vue';
import { useSolitaireStore } from '../../../stores/solitaireStore'
import { storeToRefs } from 'pinia';

const solitaireStore = useSolitaireStore()
const { solitaire } = storeToRefs(solitaireStore)

</script>

<template>
    <div class="solitaire">
        <div class="cardcol" v-for="col in solitaire">
            <Card v-for="card in col" v-bind="card"></Card>
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
