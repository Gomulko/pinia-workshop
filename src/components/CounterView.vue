<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()

const { isLoading, error, randomFact } = storeToRefs(counterStore)
const { fetchRandomFact } = counterStore
const { count } = storeToRefs(counterStore)
async function incrementAsync() {
  isLoading.value = true
  try {
    // Symulacja API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    count.value++
  } catch (err) {
    error.value = 'Failed to increment' + err
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <!-- Async Actions -->
    <div class="card">
      <h2>Async Actions</h2>

      <div class="button-group">
        <p>{{ count }}</p>
        <!-- <p>{{ counterStore.history }}</p> -->
        <button class="btn btn-primary" @click="incrementAsync" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Async +1' }}
        </button>

        <button class="btn btn-accent" @click="fetchRandomFact" :disabled="isLoading">
          Fetch store number
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading">⏳ Loading...</div>

      <!-- Error state -->
      <div v-if="error" class="error-message">❌ Error: {{ error }}</div>

      <!-- Random fact -->
      <div v-if="randomFact" class="fact-box">🔢 {{ randomFact }}</div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-weight: 600;
}

.error-message {
  padding: 1rem;
  background: #fee;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #dc2626;
  margin-top: 1rem;
}

.fact-box {
  padding: 1rem;
  background: #f0f9ff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  color: #1e40af;
  margin-top: 1rem;
  line-height: 1.6;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
