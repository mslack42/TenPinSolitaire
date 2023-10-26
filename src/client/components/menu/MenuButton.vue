<script setup lang="ts">
interface Props {
    value: string
    enabled: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'clicked', value: string): void
}>()

function clicked() {
    emit('clicked', props.value)
}
</script>

<template>
    <div class="menu-button" v-on="{ click: enabled ? clicked : null }">
        <slot></slot>
    </div>
</template>

<style></style>
