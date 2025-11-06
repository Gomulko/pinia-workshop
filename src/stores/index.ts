/**
 * Centralized store exports
 * Import all stores from this file for cleaner imports
 *
 * Usage:
 * import { useAuthStore, useProductsStore } from '@/stores';
 */

// Store modules
export { useAuthStore } from './modules/auth';
export { useProductsStore } from './modules/products';
export { useCartStore } from './modules/cart';
export { useNotificationsStore } from './modules/notifications';
export { useSettingsStore } from './modules/settings';

// Types
export type {
  // Auth types
  AuthState,
  LoginCredentials,
  AuthError,

  // Products types
  Product,
  ProductsState,

  // Cart types
  CartItem,
  CartState,

  // Notifications types
  Notification,
  NotificationType,
  NotificationsState,

  // Settings types
  Theme,
  Language,
  SettingsState
} from './types';
