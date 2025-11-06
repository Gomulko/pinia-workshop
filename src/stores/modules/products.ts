import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductsState } from '../types';

/**
 * Products Store - manages product catalog
 * Simple store example with basic CRUD operations
 */
export const useProductsStore = defineStore('products', () => {
  // ============================================
  // STATE
  // ============================================

  const items = ref<Product[]>([
    {
      id: 1,
      name: 'Laptop',
      price: 2999.99,
      description: 'High-performance laptop',
      imageUrl: '/images/laptop.jpg'
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 1499.99,
      description: 'Latest smartphone model',
      imageUrl: '/images/phone.jpg'
    }
  ]);

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Get all products
   */
  const allProducts = computed(() => items.value);

  /**
   * Get total number of products
   */
  const productCount = computed(() => items.value.length);

  /**
   * Find product by ID
   */
  const getProductById = computed(() => {
    return (id: number) => items.value.find(product => product.id === id);
  });

  /**
   * Get products sorted by price (ascending)
   */
  const productsByPrice = computed(() => {
    return [...items.value].sort((a, b) => a.price - b.price);
  });

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Fetch products from API
   * In real app, this would make an HTTP request
   */
  async function fetchProducts(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, you would fetch from API:
    // const response = await fetch('/api/products');
    // items.value = await response.json();
  }

  /**
   * Add new product to the catalog
   */
  function addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = {
      ...product,
      id: Math.max(...items.value.map(p => p.id), 0) + 1
    };

    items.value.push(newProduct);
  }

  /**
   * Update existing product
   */
  function updateProduct(id: number, updates: Partial<Product>): void {
    const index = items.value.findIndex(p => p.id === id);

    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...updates };
    }
  }

  /**
   * Remove product from catalog
   */
  function removeProduct(id: number): void {
    items.value = items.value.filter(p => p.id !== id);
  }

  // ============================================
  // RETURN (Public API)
  // ============================================

  return {
    // State
    items,

    // Getters
    allProducts,
    productCount,
    getProductById,
    productsByPrice,

    // Actions
    fetchProducts,
    addProduct,
    updateProduct,
    removeProduct
  };
});
