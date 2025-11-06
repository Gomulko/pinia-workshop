import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Theme, Language, SettingsState } from '../types';

/**
 * Settings Store - manages application settings
 * Example of store with localStorage persistence
 */
export const useSettingsStore = defineStore('settings', () => {
  // ============================================
  // STATE
  // ============================================

  const theme = ref<Theme>('light');
  const language = ref<Language>('pl');

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Get current theme
   */
  const currentTheme = computed(() => theme.value);

  /**
   * Get current language
   */
  const currentLanguage = computed(() => language.value);

  /**
   * Check if dark mode is active
   */
  const isDarkMode = computed(() => theme.value === 'dark');

  /**
   * Get all settings as object
   */
  const allSettings = computed(() => ({
    theme: theme.value,
    language: language.value
  }));

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Set theme
   */
  function setTheme(newTheme: Theme): void {
    theme.value = newTheme;
    localStorage.setItem('app_theme', newTheme);

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  /**
   * Set language
   */
  function setLanguage(newLanguage: Language): void {
    language.value = newLanguage;
    localStorage.setItem('app_language', newLanguage);

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', newLanguage);
  }

  /**
   * Toggle between light and dark theme
   */
  function toggleTheme(): void {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  /**
   * Load settings from localStorage
   */
  function loadSettings(): void {
    const storedTheme = localStorage.getItem('app_theme') as Theme | null;
    const storedLanguage = localStorage.getItem('app_language') as Language | null;

    if (storedTheme && ['light', 'dark', 'auto'].includes(storedTheme)) {
      theme.value = storedTheme;
      document.documentElement.setAttribute('data-theme', storedTheme);
    }

    if (storedLanguage && ['pl', 'en', 'de'].includes(storedLanguage)) {
      language.value = storedLanguage;
      document.documentElement.setAttribute('lang', storedLanguage);
    }
  }

  /**
   * Reset settings to defaults
   */
  function resetSettings(): void {
    setTheme('light');
    setLanguage('pl');
  }

  // Auto-load settings on store initialization
  loadSettings();

  // ============================================
  // RETURN (Public API)
  // ============================================

  return {
    // State
    theme,
    language,

    // Getters
    currentTheme,
    currentLanguage,
    isDarkMode,
    allSettings,

    // Actions
    setTheme,
    setLanguage,
    toggleTheme,
    loadSettings,
    resetSettings
  };
});
