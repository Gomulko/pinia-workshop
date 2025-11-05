<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const { count, doubleCount, message } = counterStore

const { increment, decrement, reset } = counterStore
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Destructuring Demo</h2>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Count</span>
          <span class="stat-value">{{ count }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Double</span>
          <span class="stat-value">{{ doubleCount }}</span>
        </div>
      </div>

      <div class="message-box">{{ message }}</div>

      <div class="button-group">
        <button class="btn btn-primary" @click="increment">+1</button>
        <button class="btn btn-danger" @click="decrement">-1</button>
        <button class="btn btn-reset" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  min-width: 150px;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
}

.message-box {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 10px;
  color: #78350f;
  font-weight: 600;
  text-align: center;
  margin: 1.5rem 0;
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-danger:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
}

.btn-reset {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: #065f46;
}

.btn-reset:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(132, 250, 176, 0.4);
}
</style>
