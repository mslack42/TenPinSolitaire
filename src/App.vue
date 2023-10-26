<script setup lang="ts">
import { useLocalStorageStore } from './faux-server/localStorageStore'

useLocalStorageStore().loadState()
</script>

<template>
    <router-view></router-view>
</template>

<style></style>
