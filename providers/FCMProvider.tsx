import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useAuthProvider } from '@/providers/AuthProvider';
import { ensureNotificationHandler } from '@/utils/notification/expoNotification';
import useFcm from '@/hooks/useFcm';

interface FCMContextType { token: null }

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


    useEffect(() => ensureNotificationHandler(), []);

    useEffect(() => {
        if (!isReady) return;
        const run = async () => {
            try {
                if (isLoggedIn) {
                    await register();
                    console.log('[FCM] FCM 등록 완료');
                } else {
                    await unregister();
                    console.log('[FCM] FCM 등록 해제 완료');
                }
            } catch (e) {
                console.error('[FCM]', e);
            }
        };

        run();
    }, [isLoggedIn]);

    const executeNotifications = (notificationList: (() => void)[]) => new Promise<void>((resolve, reject) => {
        notificationList.forEach((cb) => cb());
        resolve();
    });

    const clearNotificationList = () => {
        setNotificationList([]);
    }

    useEffect(() => {
        if (!isReady) return;
        if (notificationList.length > 0 && appLoaded) {
            executeNotifications(notificationList).then(clearNotificationList);
        }
    }, [appLoaded, notificationList, isReady])

    return <FCMContext.Provider value={{ token: null }}>{children}</FCMContext.Provider>;
}