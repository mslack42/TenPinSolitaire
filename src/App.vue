<script setup>
import RestartButton from './components/RestartButton.vue';
import Scoreboard from './components/scoreboard/Scoreboard.vue';
import GameTable from './components/gametable/GameTable.vue';
import TestingScoreboard from './components/test/TestingScoreboard.vue'

</script>

<template>
  <Scoreboard></Scoreboard>
  <TestingScoreboard></TestingScoreboard>
  <RestartButton></RestartButton>
  <GameTable></GameTable>
</template>

<style scoped></style>
