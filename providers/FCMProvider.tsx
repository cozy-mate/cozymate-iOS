import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import useFcm from '@/hooks/useFcm';
import { useAuthProvider } from '@/providers/AuthProvider';
import { ensureNotificationHandler } from '@/utils/notification/expoNotification';

interface FCMContextType {
  token: null;
}

const FCMContext = createContext<FCMContextType>({ token: null });

interface FCMProviderProps {
  children: ReactNode;
  appLoaded: boolean;
}
export const useFCM = () => useContext(FCMContext);

export default function FCMProvider({ children, appLoaded }: FCMProviderProps) {
  const [notificationList, setNotificationList] = useState<(() => void)[]>([]);

  const { isLoggedIn, isReady } = useAuthProvider();
  const { token, register, unregister } = useFcm(setNotificationList);

  useEffect(() => {
    console.log('[FCM] Token:', token);
  }, [token]);

  useEffect(() => ensureNotificationHandler(), []);

  useEffect(() => {
    if (!isReady) return;
    const run = async () => {
      try {
        if (isLoggedIn) {
          console.log('[FCM] Registering FCM...');
          await register();
          console.log('[FCM] Registration successful');
        } else {
          console.log('[FCM] Unregistering FCM...');
          await unregister();
          console.log('[FCM] Unregistration successful');
        }
      } catch (e) {
        console.error('[FCM Provider Error] : ', e);
      }
    };

    run();
  }, [isLoggedIn]);

  const executeNotifications = (notificationList: (() => void)[]) =>
    new Promise<void>((resolve, reject) => {
      console.log('[FCM] Executing notifications:', notificationList.length);
      notificationList.forEach((cb) => cb());
      resolve();
    });

  const clearNotificationList = () => {
    console.log('[FCM] Clearing notification list');
    setNotificationList([]);
  };

  useEffect(() => {
    if (!isReady) return;
    if (notificationList.length > 0 && appLoaded) {
      console.log('[FCM] Processing notifications:', notificationList.length);
      executeNotifications(notificationList).then(clearNotificationList);
    }
  }, [appLoaded, notificationList, isReady]);

  return <FCMContext.Provider value={{ token: null }}>{children}</FCMContext.Provider>;
}
