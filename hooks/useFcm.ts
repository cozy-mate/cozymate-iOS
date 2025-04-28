// src/hooks/useFcm.ts
import { useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { getDeviceId } from 'react-native-device-info';

import {
  requestUserPermission,
  deactivateFcmToken,
  getFcmToken,
} from '@/utils/notification/fcmTokenUtil';
import { postFcmToken } from '@/apis/fcm/fcm';

const DEDUP_WINDOW = 10_000;
const processed = new Set<string>();

export interface UseFcmReturn {
  token: string | null;
  register: () => Promise<void>;
  unregister: () => Promise<void>;
}

export default function useFcm(): UseFcmReturn {
  const listener = useRef<Notifications.Subscription | null>(null);
  const clicker  = useRef<Notifications.Subscription | null>(null);
  const fgSub    = useRef<() => void>();
  const tokenRef = useRef<string | null>(null);

  const withDedup = (id: string | undefined, fn: () => void) => {
    if (!id || processed.has(id)) return;
    processed.add(id);
    fn();
    setTimeout(() => processed.delete(id), DEDUP_WINDOW);
  };

  const register = async () => {
    await requestUserPermission();
    const token = await getFcmToken();
    if (!token) throw new Error('FCM 토큰 획득 실패');

    tokenRef.current = token;
    await postFcmToken({ deviceId: await getDeviceId(), token });

    fgSub.current = messaging().onTokenRefresh(async newToken => {
      tokenRef.current = newToken;
      await postFcmToken({ deviceId: await getDeviceId(), token: newToken });
    });

    messaging().onMessage(async msg => {
      withDedup(msg.messageId, async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: msg.notification?.title ?? 'cozymate',
            body : msg.notification?.body  ?? '',
            data : msg.data ?? {},
          },
          trigger: null,
        });
      });
    });

    listener.current = Notifications.addNotificationReceivedListener(n =>
      withDedup(n.request.identifier, () => console.log('FCM 알림 수신:', n)),
    );

    clicker.current = Notifications.addNotificationResponseReceivedListener(r => {
      console.log('🖱 알림 탭:', r);
      // TODO: 딥링크·네비게이션 처리
    });
  };

  const unregister = async () => {
    try {
      await deactivateFcmToken();
    } finally {
      listener.current?.remove();
      clicker.current?.remove();
      fgSub.current?.();
      listener.current = clicker.current = undefined!;
      tokenRef.current = null;
    }
  };

  return { token: tokenRef.current, register, unregister };
}