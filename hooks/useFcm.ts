import messaging from '@react-native-firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { getDeviceId } from 'react-native-device-info';

import { postFcmToken } from '@/server/fcm/fcm';
import { convertAction } from '@/utils/notification/convertAction';
import {
  requestUserPermission,
  deactivateFcmToken,
  getFcmToken,
} from '@/utils/notification/fcmTokenUtil';
import { useHasRoomStore } from '@/zustand/room/room';

const DEDUP_WINDOW = 10_000;
const processed = new Set<string>();

export interface UseFcmReturn {
  token: string | null;
  register: () => Promise<void>;
  unregister: () => Promise<void>;
}

export default function useFcm(
  setNotificationList: React.Dispatch<React.SetStateAction<(() => void)[]>>,
): UseFcmReturn {
  const listener = useRef<Notifications.Subscription | null>(null);
  const clicker = useRef<Notifications.Subscription | null>(null);
  const fgSub = useRef<() => void>();
  const tokenRef = useRef<string | null>(null);

  const queryClient = useQueryClient();

  const router = useRouter();

  const { roomInfo } = useHasRoomStore();

  const withDedup = (id: string | undefined, cb: () => void) => {
    if (!id || processed.has(id)) return;
    processed.add(id);
    cb();
    setTimeout(() => processed.delete(id), DEDUP_WINDOW);
  };

  const register = async () => {
    listener.current?.remove();
    clicker.current?.remove();
    fgSub.current?.();

    listener.current = null;
    clicker.current = null;
    fgSub.current = undefined;

    await requestUserPermission();
    const token = await getFcmToken();
    if (!token) throw new Error('FCM 토큰 획득 실패');

    tokenRef.current = token;
    await postFcmToken({ deviceId: await getDeviceId(), token });

    fgSub.current = messaging().onTokenRefresh(async (newToken) => {
      tokenRef.current = newToken;
      await postFcmToken({ deviceId: await getDeviceId(), token: newToken });
    });

    messaging().onMessage(async (msg) => {
      withDedup(msg.messageId, async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: msg.notification?.title ?? 'cozymate',
            body: msg.notification?.body ?? '',
            data: msg.data ?? {},
          },
          trigger: null,
        });

        const data = msg.data;

        const actionType = msg.data?.actionType;

        switch (actionType) {
          case 'ARRIVE_ROOM_INVITE':
            console.log('요청 받음');
            break;

          // 방장 입장
          case 'ARRIVE_ROOM_JOIN_REQUEST':
            console.log('방 참여 요청 받음');
            await queryClient.invalidateQueries({ queryKey: [`/rooms/pending-members`] });
            break;

          case 'ROOM_IN':
            console.log('방장) 방 요청 수락');
            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });
            break;

          case 'ROOM_OUT':
            console.log('방에서 누가 나감');
            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });
            break;

          default:
            console.log('data: ', data);
            console.log(`Unhandled actionType: ${actionType}`);
        }
      });
    });

    if (!listener.current) {
      listener.current = null;
      listener.current = Notifications.addNotificationReceivedListener((n) =>
        withDedup(n.request.identifier, () => {
          console.log('notification received', n);
        }),
      );
    }

    if (!clicker.current) {
      clicker.current = null;
      clicker.current = Notifications.addNotificationResponseReceivedListener((r) => {
        const url = convertAction(r);
        if (url && url !== 'NO_ACTION') {
          setNotificationList((prev) =>
            // TODO : 적절한 타입으로 변환하기
            [...prev, () => router.push(url as any)],
          );
        }
      });
    }
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
