import messaging from '@react-native-firebase/messaging';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import useFcm from '@/hooks/useFcm';
import { ensureNotificationHandler } from '@/utils/notification/expoNotification';
import { useMemberStore } from '@/zustand/store';

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

  const { isLoggedIn } = useMemberStore();
  const { token, register, unregister } = useFcm(setNotificationList);

  useEffect(() => {
    console.log('[FCM] Token:', token);
  }, [token]);

  useEffect(() => ensureNotificationHandler(), []);

  useEffect(() => {
    if (!appLoaded) return;
    const run = async () => {
      const status = await messaging().requestPermission();

      const enabled =
        status === messaging.AuthorizationStatus.AUTHORIZED ||
        status === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        throw new Error('No permission for push notifications');
      }
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
    if (!appLoaded) return;
    if (notificationList.length > 0 && appLoaded) {
      console.log('[FCM] Processing notifications:', notificationList.length);
      executeNotifications(notificationList).then(clearNotificationList);
    }
  }, [appLoaded, notificationList]);

  return <FCMContext.Provider value={{ token: null }}>{children}</FCMContext.Provider>;
}
