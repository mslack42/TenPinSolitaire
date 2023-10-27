<script setup lang="ts">
import { useLocalStorageStore } from './faux-server/localStorageStore'

useLocalStorageStore().loadState()
</script>

<template>
    <router-view></router-view>
</template>

<style>
html,
body {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: sans-serif;
}

#app {
    min-height: 100%;
    min-width: 100%;
    background-color: rgb(0, 165, 0);
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
