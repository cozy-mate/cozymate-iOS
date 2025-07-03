import * as Notifications from 'expo-notifications';

export function ensureNotificationHandler() {
  if ((globalThis as any).__expoNotifHandlerSet) return;
  (globalThis as any).__expoNotifHandlerSet = true;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}
