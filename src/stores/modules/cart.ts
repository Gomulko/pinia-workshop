import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, CartState } from '../types';
import { useProductsStore } from './products';

/**
 * Cart Store - manages shopping cart
 * Example of store composition (using other stores)
 */
export const useCartStore = defineStore('cart', () => {
  // ============================================
  // STATE
  // ============================================

  const cartItems = ref<CartItem[]>([]);

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Get all items in cart
   */
  const items = computed(() => cartItems.value);

  /**
   * Calculate total number of items in cart
   */
  const itemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  /**
   * Calculate total price of all items in cart
   */
  const totalPrice = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  /**
   * Check if cart is empty
   */
  const isEmpty = computed(() => cartItems.value.length === 0);

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Add product to cart
   */
  function addToCart(productId: number, quantity: number = 1): void {
    const productsStore = useProductsStore();
    const product = productsStore.getProductById(productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    const existingItem = cartItems.value.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({
        productId,
        quantity,
        product
      });
    }
  }

  /**
   * Remove product from cart
   */
  function removeFromCart(productId: number): void {
    cartItems.value = cartItems.value.filter(item => item.productId !== productId);
  }

  /**
   * Update quantity of product in cart
   */
  function updateQuantity(productId: number, quantity: number): void {
    const item = cartItems.value.find(item => item.productId === productId);

    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  /**
   * Clear all items from cart
   */
  function clearCart(): void {
    cartItems.value = [];
  }

  // ============================================
  // RETURN (Public API)
  // ============================================

  return {
    // State
    cartItems,

    // Getters
    items,
    itemCount,
    totalPrice,
    isEmpty,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
});
