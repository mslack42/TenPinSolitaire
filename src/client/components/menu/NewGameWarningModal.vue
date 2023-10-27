<script setup lang="ts">
import ModalDialog from '../common/ModalDialog.vue'
import ActionButton from '../common/ActionButton.vue'

defineProps({
    open: Boolean
})
defineEmits(['close', 'newGame'])
</script>

<template>
    <ModalDialog :isOpen="open">
        <template v-slot:modal-header>
            <h1>Warning</h1>
        </template>
        <template v-slot:modal-body> You've got a game in progress already! </template>
        <template v-slot:modal-footer
            ><ActionButton class="modal-button" action-type="MenuAction" @clicked="$emit('close')"
                >Cancel</ActionButton
            >
            <ActionButton
                class="modal-button"
                action-type="ConsequenceAction"
                @clicked="$emit('newGame')"
                >Start</ActionButton
            >
            <!-- <div class="action" @click="$emit('close')">Close</div>
            <div class="action" @click="$emit('newGame')">Start</div> -->
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
