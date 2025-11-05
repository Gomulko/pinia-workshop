import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // ===== STATE =====
  const count = ref<number>(0)
  const message = ref<string>('Hello from Pinia!')
  const history = ref<number[]>([]) // historia zmian

  // ===== GETTERS =====
  const doubleCount = computed(() => count.value * 2)
  const countStatus = computed(() => {
    if (count.value === 0) return 'zero'
    if (count.value > 0) return 'positive'
    return 'negative'
  })

  const historyCount = computed(() => history.value.length)

  // Getter z parametrem (trick!)
  const isGreaterThan = computed(() => {
    return (threshold: number) => count.value > threshold
  })

  // ===== ACTIONS =====
  function increment() {
    count.value++
    history.value.push(count.value)
  }

  function decrement() {
    count.value--
    history.value.push(count.value)
  }

  function incrementBy(amount: number) {
    count.value += amount
    history.value.push(count.value)
  }

  function reset() {
    count.value = 0
    history.value = []
  }

  function setMessage(newMessage: string) {
    message.value = newMessage
  }

  // ===== RETURN (expose to components) =====
  return {
    // State
    count,
    message,
    history,

    // Getters
    doubleCount,
    countStatus,
    historyCount,
    isGreaterThan,

    // Actions
    increment,
    decrement,
    incrementBy,
    reset,
    setMessage,
  }
})
