<script setup lang="ts">
import CounterDestructured from './components/CounterDestructured.vue'
// import CounterView from './components/CounterView.vue'
</script>

<template>
  <CounterDestructured />
  <!-- <CounterView /> -->
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

:deep(.container) {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

:deep(.card) {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

:deep(.card:hover) {
  transform: translateY(-4px);
}

:deep(h2) {
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

:deep(.button-group) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

:deep(.btn) {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
}

:deep(.btn-primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

:deep(.btn-primary:hover:not(:disabled)) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

:deep(.btn-accent) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

:deep(.btn-accent:hover:not(:disabled)) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
}

:deep(p) {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin: 1rem 0;
}
</style>
