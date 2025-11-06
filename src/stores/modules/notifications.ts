import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Notification, NotificationType, NotificationsState } from '../types';

/**
 * Notifications Store - manages app notifications
 * Simple store for displaying user notifications
 */
export const useNotificationsStore = defineStore('notifications', () => {
  // ============================================
  // STATE
  // ============================================

  const notifications = ref<Notification[]>([]);

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Get all notifications
   */
  const allNotifications = computed(() => notifications.value);

  /**
   * Get count of active notifications
   */
  const notificationCount = computed(() => notifications.value.length);

  /**
   * Get notifications by type
   */
  const getByType = computed(() => {
    return (type: NotificationType) =>
      notifications.value.filter(n => n.type === type);
  });

  /**
   * Check if there are any error notifications
   */
  const hasErrors = computed(() =>
    notifications.value.some(n => n.type === 'error')
  );

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Add a new notification
   */
  function addNotification(
    message: string,
    type: NotificationType = 'info'
  ): void {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: Date.now()
    };

    notifications.value.push(notification);

    // Auto-remove after 5 seconds (except errors)
    if (type !== 'error') {
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    }
  }

  /**
   * Remove notification by ID
   */
  function removeNotification(id: string): void {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  /**
   * Clear all notifications
   */
  function clearAll(): void {
    notifications.value = [];
  }

  /**
   * Convenience methods for different notification types
   */
  function success(message: string): void {
    addNotification(message, 'success');
  }

  function error(message: string): void {
    addNotification(message, 'error');
  }

  function warning(message: string): void {
    addNotification(message, 'warning');
  }

  function info(message: string): void {
    addNotification(message, 'info');
  }

  // ============================================
  // RETURN (Public API)
  // ============================================

  return {
    // State
    notifications,

    // Getters
    allNotifications,
    notificationCount,
    getByType,
    hasErrors,

    // Actions
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
});
