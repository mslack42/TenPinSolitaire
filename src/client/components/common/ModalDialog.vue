<script setup lang="ts">
defineProps({
    isOpen: Boolean
})
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="dialog">
            <div class="modal-backdrop">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="modal-header"></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="modal-footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-content {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;

    display: block;
    padding: 1em 1em;
    border: black;
    border-width: 2px;
    border-radius: 5px;
    background: white;
    width: 300px;
    margin: 3px;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-footer {
    padding-top: 20px;
    text-align: right;
}
</style>
