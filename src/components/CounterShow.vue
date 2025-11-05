<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <h1>Counter Component</h1>
  <p>{{ counterStore.count }}</p>
  <button @click="counterStore.increment()">Add ++</button>
</template>
