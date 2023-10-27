<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from '../common/ModalDialog.vue'
import ActionButton from '../common/ActionButton.vue'

defineProps({
    open: Boolean
})
defineEmits(['newGame', 'close'])

const customSeed = ref('')
</script>

<template>
    <ModalDialog :isOpen="open">
        <template v-slot:modal-header>
            <h1>Game Settings</h1>
        </template>
        <template v-slot:modal-body>
            <div>Set a custom seed?:</div>
            <input maxlength="20" v-model="customSeed" placeholder="Custom seed..." />
        </template>
        <template v-slot:modal-footer>
            <ActionButton class="modal-button" action-type="MenuAction" @clicked="$emit('close')"
                >Cancel</ActionButton
            >
            <ActionButton
                class="modal-button"
                action-type="NoConsequenceAction"
                @clicked="$emit('newGame', customSeed)"
                >Start</ActionButton
            >
        </template>
    </ModalDialog>
</template>

<style scoped>
.modal-button {
    display: inline-block;
    padding: 5px 15px;
    margin: 0px 5px;
}
</style>
