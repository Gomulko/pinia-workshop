// stores/user.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCounterStore } from './counter'

export const useUserStore = defineStore(
  'user',
  () => {
    // ===== STATE =====
    const username = ref<string>('Guest')
    const password = ref<string>('Password1234')
    const creditCard = ref<number>(123123123)
    const isLoggedIn = ref<boolean>(false)
    const favoriteNumber = ref<number>(0)

    // ===== GETTERS =====
    const displayName = computed(() => {
      return isLoggedIn.value ? username.value : 'Anonymous'
    })
    const userCounterMessage = computed(() => {
      const counterStore = useCounterStore()
      return `${displayName.value}, your count is ${counterStore.count}`
    })

    // ===== ACTIONS =====
    function login() {
      isLoggedIn.value = true
      const counterStore = useCounterStore()
      favoriteNumber.value = counterStore.count
    }
    function setName(name: string) {
      username.value = name
    }
    function setPassword(pass: string) {
      password.value = pass
    }
    function setCreditNumber(card: number) {
      creditCard.value = card
    }
    function logout() {
      username.value = 'Guest'
      isLoggedIn.value = false
      favoriteNumber.value = 0
    }
    function syncWithCounter() {
      const counterStore = useCounterStore()
      favoriteNumber.value = counterStore.count
    }
    function resetCounter() {
      const counterStore = useCounterStore()
      counterStore.reset()
    }

    return {
      // State
      username,
      isLoggedIn,
      favoriteNumber,
      password,
      creditCard,

      // Getters
      displayName,
      userCounterMessage,

      // Actions
      login,
      logout,
      syncWithCounter,
      resetCounter,
      setName,
      setPassword,
      setCreditNumber,
    }
  },
  {
    persist: true, // ← PERSIST! Wszystkie dane przetrwają refresh
  },
)
