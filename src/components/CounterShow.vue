<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue'
const counterStore = useCounterStore()
const showAlertAlert = ref(false)
if (counterStore.isGreaterThan(10)) {
  showAlertAlert.value = true
}
</script>

<template>
  <div v-if="showAlertAlert">
    <h1>⚠️ Alert</h1>
  </div>
  <div class="container">
    <h1 class="title">🎯 Pinia Counter Store Demo</h1>

    <!-- Main Counter Display -->
    <div class="card main-counter">
      <h2>Counter Value</h2>
      <div class="big-number">{{ counterStore.count }}</div>
      <div class="status-badge" :class="counterStore.countStatus">
        Status: {{ counterStore.countStatus }}
      </div>
    </div>

    <!-- Actions -->
    <div class="card">
      <h2>Actions</h2>
      <div class="button-group">
        <button class="btn btn-primary" @click="counterStore.increment">+1</button>
        <button class="btn btn-secondary" @click="counterStore.decrement">-1</button>
        <button class="btn btn-accent" @click="counterStore.incrementBy(10)">+10</button>
        <button class="btn btn-danger" @click="counterStore.reset">Reset</button>
      </div>
    </div>

    <!-- Getters -->
    <div class="card">
      <h2>Getters (Computed Values)</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Double Count:</span>
          <span class="value">{{ counterStore.doubleCount }}</span>
        </div>
        <div class="info-item">
          <span class="label">Greater than 10?</span>
          <span class="value">{{ counterStore.isGreaterThan(10) ? '✅ Yes' : '❌ No' }}</span>
        </div>
      </div>
    </div>

    <!-- Message -->
    <div class="card">
      <h2>Message</h2>
      <p class="message">{{ counterStore.message }}</p>
    </div>

    <!-- History -->
    <div class="card">
      <h2>History ({{ counterStore.history.length }} changes)</h2>
      <div class="history">
        <span v-if="counterStore.history.length === 0" class="empty">No history yet...</span>
        <span v-else class="history-items">
          {{ counterStore.history.join(' → ') }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 100px;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #34495e;
}

/* Main Counter */
.main-counter {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.main-counter h2 {
  color: white;
  opacity: 0.9;
}

.big-number {
  font-size: 5rem;
  font-weight: bold;
  margin: 1rem 0;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
}

.status-badge.positive {
  background: #10b981;
}

.status-badge.negative {
  background: #ef4444;
}

.status-badge.zero {
  background: #6b7280;
}

/* Buttons */
.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-accent {
  background: #10b981;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

/* Info Grid */
.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 8px;
}

.label {
  font-weight: 600;
  color: #6b7280;
}

.value {
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
}

/* Message */
.message {
  font-size: 1.1rem;
  color: #4b5563;
  margin: 0;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

/* History */
.history {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  min-height: 3rem;
  display: flex;
  align-items: center;
}

.empty {
  color: #9ca3af;
  font-style: italic;
}

.history-items {
  color: #2c3e50;
  font-weight: 600;
  word-break: break-all;
}
</style>
