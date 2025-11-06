import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../../stores/modules/auth';
import type { LoginCredentials } from '../../stores/types';

/**
 * Auth Store Tests
 * Basic test suite demonstrating Pinia store testing with Vitest
 */
describe('useAuthStore', () => {
  // Create a fresh Pinia instance before each test
  beforeEach(() => {
    setActivePinia(createPinia());
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const store = useAuthStore();

      expect(store.isAuthenticated).toBe(false);
      expect(store.token).toBe(null);
      expect(store.loading).toBe(false);
      expect(store.error).toBe(null);
    });

    it('should have isLoggedIn getter return false initially', () => {
      const store = useAuthStore();

      expect(store.isLoggedIn).toBe(false);
    });
  });

  describe('Login Action', () => {
    it('should login successfully with valid credentials', async () => {
      const store = useAuthStore();
      const credentials: LoginCredentials = {
        username: 'admin',
        password: 'password'
      };

      await store.login(credentials);

      expect(store.isAuthenticated).toBe(true);
      expect(store.token).toBe('mock-jwt-token-12345');
      expect(store.isLoggedIn).toBe(true);
      expect(store.error).toBe(null);
    });

    it('should fail login with invalid credentials', async () => {
      const store = useAuthStore();
      const credentials: LoginCredentials = {
        username: 'wrong',
        password: 'wrong'
      };

      await expect(store.login(credentials)).rejects.toThrow();

      expect(store.isAuthenticated).toBe(false);
      expect(store.token).toBe(null);
      expect(store.error).not.toBe(null);
      expect(store.error?.message).toBe('Invalid credentials');
    });

    it('should fail login with empty credentials', async () => {
      const store = useAuthStore();
      const credentials: LoginCredentials = {
        username: '',
        password: ''
      };

      await expect(store.login(credentials)).rejects.toThrow();

      expect(store.isAuthenticated).toBe(false);
      expect(store.error?.message).toBe('Username and password are required');
    });

    it('should set loading state during login', async () => {
      const store = useAuthStore();
      const credentials: LoginCredentials = {
        username: 'admin',
        password: 'password'
      };

      const loginPromise = store.login(credentials);

      // Loading should be true during async operation
      expect(store.loading).toBe(true);

      await loginPromise;

      // Loading should be false after completion
      expect(store.loading).toBe(false);
    });

    it('should store token in localStorage on successful login', async () => {
      const store = useAuthStore();
      const credentials: LoginCredentials = {
        username: 'admin',
        password: 'password'
      };

      await store.login(credentials);

      expect(localStorage.getItem('auth_token')).toBe('mock-jwt-token-12345');
    });
  });

  describe('Logout Action', () => {
    it('should clear auth state on logout', async () => {
      const store = useAuthStore();

      // First login
      await store.login({ username: 'admin', password: 'password' });
      expect(store.isAuthenticated).toBe(true);

      // Then logout
      store.logout();

      expect(store.isAuthenticated).toBe(false);
      expect(store.token).toBe(null);
      expect(store.error).toBe(null);
    });

    it('should remove token from localStorage on logout', async () => {
      const store = useAuthStore();

      // First login
      await store.login({ username: 'admin', password: 'password' });
      expect(localStorage.getItem('auth_token')).not.toBe(null);

      // Then logout
      store.logout();

      expect(localStorage.getItem('auth_token')).toBe(null);
    });
  });

  describe('Restore Auth Action', () => {
    it('should restore authentication from localStorage', () => {
      const store = useAuthStore();

      // Simulate stored token
      localStorage.setItem('auth_token', 'stored-token-123');

      store.restoreAuth();

      expect(store.isAuthenticated).toBe(true);
      expect(store.token).toBe('stored-token-123');
    });

    it('should not restore auth if no token in localStorage', () => {
      const store = useAuthStore();

      store.restoreAuth();

      expect(store.isAuthenticated).toBe(false);
      expect(store.token).toBe(null);
    });
  });

  describe('Clear Error Action', () => {
    it('should clear error state', async () => {
      const store = useAuthStore();

      // Cause an error
      try {
        await store.login({ username: 'wrong', password: 'wrong' });
      } catch (e) {
        // Expected error
      }

      expect(store.error).not.toBe(null);

      // Clear error
      store.clearError();

      expect(store.error).toBe(null);
    });
  });

  describe('Getters', () => {
    it('should return correct token with getToken getter', async () => {
      const store = useAuthStore();

      await store.login({ username: 'admin', password: 'password' });

      expect(store.getToken).toBe('mock-jwt-token-12345');
    });

    it('should return loading state with isLoading getter', () => {
      const store = useAuthStore();

      expect(store.isLoading).toBe(false);
    });

    it('should return error with currentError getter', async () => {
      const store = useAuthStore();

      try {
        await store.login({ username: 'wrong', password: 'wrong' });
      } catch (e) {
        // Expected error
      }

      expect(store.currentError).not.toBe(null);
      expect(store.currentError?.message).toBe('Invalid credentials');
    });
  });
});
