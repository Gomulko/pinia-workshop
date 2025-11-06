<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCounterStore } from '@/stores/counter'

const userStore = useUserStore()
const counterStore = useCounterStore()

const { isLoggedIn, favoriteNumber, displayName, userCounterMessage, creditCard, password } =
  storeToRefs(userStore)
const { count } = storeToRefs(counterStore)
const { increment } = counterStore
const { login, logout, syncWithCounter, resetCounter, setName, setPassword, setCreditNumber } =
  userStore

const tempUsername = ref('')
const tempCreditCard = ref(0)
const tempPassword = ref('')

function handleLogin() {
  setName(tempUsername.value)
  setPassword(tempPassword.value)
  setCreditNumber(tempCreditCard.value)
  login()
}
</script>

<template>
  <div class="container">
    <div class="card user-panel">
      <h2>👤 User Panel</h2>

      <!-- Login form -->
      <div v-if="!isLoggedIn" class="login-form">
        <div class="form-group">
          <label>User Name</label>
          <input 
            v-model="tempUsername" 
            type="text"
            class="input" 
            placeholder="Enter your name"
            @keyup.enter="setName(tempUsername)" 
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="tempPassword" 
            class="input"
            placeholder="Enter password"
            @keyup.enter="setPassword(tempPassword)" 
          />
        </div>

        <div class="form-group">
          <label>Credit Card</label>
          <input 
            v-model.number="tempCreditCard" 
            type="number"
            class="input"
            placeholder="Enter credit card number"
            @keyup.enter="setCreditNumber(tempCreditCard)" 
          />
        </div>
        
        <button class="btn btn-primary" @click="handleLogin()">Login</button>
      </div>

      <!-- Logged in state -->
      <div v-else class="user-info">
        <div class="welcome">
          <h3>Welcome, <strong>{{ displayName }}</strong>! 👋</h3>
        </div>
        
        <div class="user-details">
          <div class="detail-item">
            <span class="detail-label">Credit Card:</span>
            <span class="detail-value">{{ creditCard }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Password:</span>
            <span class="detail-value">{{ password }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Favorite Number:</span>
            <span class="detail-value">{{ favoriteNumber }}</span>
          </div>
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" @click="syncWithCounter">
            Set number ({{ count }})
          </button>
          <button class="btn btn-secondary" @click="increment">Incremet ++ ({{ count }})</button>
          <button class="btn btn-danger" @click="resetCounter">Reset Counter</button>
          <button class="btn btn-accent" @click="logout">Logout</button>
        </div>
      </div>

      <!-- Cross-store getter -->
      <div class="message-box">
        <p>{{ userCounterMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.user-panel {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-panel h2 {
  color: white;
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}

/* Login Form Styles */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.95;
  letter-spacing: 0.5px;
}

.input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input::placeholder {
  color: #999;
}

.input:focus {
  outline: none;
  background: white;
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

/* User Info Styles */
.user-info {
  margin: 1.5rem 0;
}

.welcome {
  text-align: center;
  margin-bottom: 2rem;
}

.welcome h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.welcome strong {
  font-weight: 700;
  color: #ffd700;
}

.user-details {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 500;
  opacity: 0.9;
}

.detail-value {
  font-weight: 700;
  font-size: 1.1rem;
  color: #ffd700;
}

/* Message Box */
.message-box {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.message-box p {
  margin: 0;
  font-size: 1rem;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 140px;
  padding: 0.875rem 1.25rem;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: #3b82f6;
  color: white;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-accent {
  background: #10b981;
  color: white;
}

.btn-accent:hover {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Responsive */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    min-width: auto;
  }
}
</style>
