<script setup lang="ts">
import { computed } from 'vue'

type ActionType = 'ConsequenceAction' | 'NoConsequenceAction' | 'MenuAction'

interface Props {
    disabled?: Boolean
    actionType?: ActionType
}

const props = defineProps<Props>()

const emit = defineEmits(['clicked'])

function handleClick() {
    emit('clicked')
}

const classes = computed(() =>
    [
        props.disabled ? 'disabled ' : 'enabled ',
        props.actionType === 'ConsequenceAction' ? 'red-action ' : '',
        props.actionType === 'NoConsequenceAction' ? 'blue-action ' : '',
        props.actionType === 'MenuAction' ? 'purple-action ' : ''
    ]
        .join('')
        .trim()
)
</script>

<template>
    <div class="action-button" v-on="{ click: !disabled ? handleClick : null }" :class="classes">
        <div class="action-button-body">
            <slot>ButtonText</slot>
        </div>
    </div>
</template>

<style scoped>
.action-button {
    padding: 8px;
    font-size: 1em;
    display: flex;
    border-style: solid;
    border-radius: 5px;
    box-shadow: 2px 2px 1px 1px rgba(58, 56, 56, 0.521);
    cursor: default;
}

.action-button.disabled {
    background-color: gray;
    border-color: rgba(58, 56, 56, 0.521);
    opacity: 50%;
}

.action-button.enabled {
    color: white;
    cursor: pointer;
}

.action-button.enabled.red-action {
    background-color: rgb(253, 120, 120);
    border-color: rgb(253, 93, 93);
}

.action-button.enabled.blue-action {
    background-color: rgb(99, 99, 250);
    border-color: rgb(78, 78, 253);
}

.action-button.enabled.purple-action {
    background-color: rgb(143, 88, 143);
    border-color: rgb(145, 76, 145);
}
</style>
