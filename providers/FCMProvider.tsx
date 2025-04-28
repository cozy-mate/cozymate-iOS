import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useAuthProvider } from '@/providers/AuthProvider';
import { ensureNotificationHandler } from '@/utils/notification/expoNotification';
import useFcm from '@/hooks/useFcm';

interface FCMContextType { token: null }
const FCMContext = createContext<FCMContextType>({ token: null });
export const useFCM = () => useContext(FCMContext);

export default function FCMProvider({ children }: { children: ReactNode }) {

    const { isLoggedIn } = useAuthProvider();
    const { token, register, unregister } = useFcm();
    const [ready, setReady] = useState(false);

    useEffect(() => ensureNotificationHandler(), []);

    useEffect(() => {
        console.log('[FCM] isLoggedIn', isLoggedIn);
        (isLoggedIn ? register : unregister)()
            .catch(e => console.error('[FCM]', e))
            .finally(() => setReady(true));
    }, [isLoggedIn]);

    return <FCMContext.Provider value={{ token: null }}>{children}</FCMContext.Provider>;
}