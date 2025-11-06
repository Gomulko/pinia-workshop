import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthState, LoginCredentials, AuthError } from '../types';

/**
 * Auth Store - handles user authentication
 * Example store with error handling in async actions
 */
export const useAuthStore = defineStore('auth', () => {
  // ============================================
  // STATE
  // ============================================

  const isAuthenticated = ref<boolean>(false);
  const token = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<AuthError | null>(null);

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Check if user is currently logged in
   */
  const isLoggedIn = computed(() => isAuthenticated.value && token.value !== null);

  /**
   * Get current token value
   */
  const getToken = computed(() => token.value);

  /**
   * Check if auth operation is in progress
   */
  const isLoading = computed(() => loading.value);

  /**
   * Get current error if any
   */
  const currentError = computed(() => error.value);

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Login user with credentials
   * Example of async action with error handling
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    // Reset error state
    error.value = null;
    loading.value = true;

    try {
      // Validate credentials
      if (!credentials.username || !credentials.password) {
        throw new Error('Username and password are required');
      }

      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock authentication logic
          if (credentials.username === 'admin' && credentials.password === 'password') {
            resolve({ token: 'mock-jwt-token-12345' });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      }).then((response: any) => {
        // Success - set auth state
        token.value = response.token;
        isAuthenticated.value = true;

        // Store token in localStorage for persistence
        localStorage.setItem('auth_token', response.token);
      });
    } catch (err) {
      // Error handling
      const authError: AuthError = {
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        code: 'AUTH_ERROR'
      };

      error.value = authError;
      isAuthenticated.value = false;
      token.value = null;

      // Re-throw for component-level handling if needed
      throw authError;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Logout user and clear auth state
   */
  function logout(): void {
    isAuthenticated.value = false;
    token.value = null;
    error.value = null;

    // Clear stored token
    localStorage.removeItem('auth_token');
  }

  /**
   * Restore authentication from localStorage
   */
  function restoreAuth(): void {
    const storedToken = localStorage.getItem('auth_token');

    if (storedToken) {
      token.value = storedToken;
      isAuthenticated.value = true;
    }
  }

  /**
   * Clear error state
   */
  function clearError(): void {
    error.value = null;
  }

  // ============================================
  // RETURN (Public API)
  // ============================================

  return {
    // State
    isAuthenticated,
    token,
    loading,
    error,

    // Getters
    isLoggedIn,
    getToken,
    isLoading,
    currentError,

    // Actions
    login,
    logout,
    restoreAuth,
    clearError
  };
});
