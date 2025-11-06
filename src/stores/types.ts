/**
 * Types for Pinia stores
 * Centralized type definitions for all store modules
 */

// ============================================
// AUTH STORE TYPES
// ============================================

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

// ============================================
// PRODUCTS STORE TYPES
// ============================================

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface ProductsState {
  items: Product[];
}

// ============================================
// CART STORE TYPES
// ============================================

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface CartState {
  cartItems: CartItem[];
}

// ============================================
// NOTIFICATIONS STORE TYPES
// ============================================

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}

export interface NotificationsState {
  notifications: Notification[];
}

// ============================================
// SETTINGS STORE TYPES
// ============================================

export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'pl' | 'en' | 'de';

export interface SettingsState {
  theme: Theme;
  language: Language;
}
