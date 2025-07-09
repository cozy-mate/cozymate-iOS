import messaging from '@react-native-firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { getDeviceId } from 'react-native-device-info';

import { postFcmToken } from '@/server/fcm/fcm';
import { checkHasRoom } from '@/server/room/room';
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

  const { roomInfo, setRoomInfo } = useHasRoomStore();

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
        const targetId = msg.data?.targetId;

        switch (actionType) {
          // 사용자가 방에 참여 요청을 보낸 경우 (사용자 -> 방) : 방장이 쿼리 무효화
          case 'ARRIVE_ROOM_JOIN_REQUEST':
            await queryClient.invalidateQueries({ queryKey: [`/rooms/pending-members`] });
            break;

          // 방장이 방 참여 요청을 수락한 경우 : 사용자가 쿼리 무효화
          case 'ACCEPT_ROOM_JOIN':
            const response = await checkHasRoom();
            setRoomInfo(response.result);

            await queryClient.invalidateQueries({ queryKey: [`/rooms/exist`] });
            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });
            await queryClient.invalidateQueries({
              queryKey: [`/rooms/${roomInfo.roomId}`, roomInfo.roomId],
            });
            await queryClient.invalidateQueries({ queryKey: [`/rooms/requested`] });

            break;

          // 방장이 유저의 방 참여 요청을 거절한 경우 : 사용자가 쿼리 무효화
          case 'REJECT_ROOM_JOIN':
            await queryClient.invalidateQueries({
              queryKey: [`/rooms/${targetId}/pending-status`, targetId],
            });
            // 홈 화면
            await queryClient.invalidateQueries({ queryKey: [`/rooms/requested`] });
            break;

          // 방장이 사용자에게 참가 요청을 보낸 경우 (방장 -> 사용자) : 사용자가 쿼리 무효화
          case 'ARRIVE_ROOM_INVITE':
            // await queryClient.invalidateQueries({ queryKey: [`/rooms/invited`] });
            break;

          // 유저가 방 참여 요청을 수락한 경우 : 방장이 쿼리 무효화
          case 'ACCEPT_ROOM_INVITE':
            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });
            await queryClient.invalidateQueries({
              queryKey: [`/rooms/${roomInfo.roomId}`, roomInfo.roomId],
            });
            break;

          // 유저가 방장의 방 초대 요청을 거절한 경우 : 방장이 쿼리 무효화
          case 'REJECT_ROOM_INVITE':
            await queryClient.invalidateQueries({
              queryKey: [`/rooms/invited-status/${targetId}`, targetId],
            });
            break;

          case 'ROOM_IN':
            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });
            break;

          case 'ROOM_OUT':
            const checkHasRoomResponse = await checkHasRoom();
            // 방장 여부 저장
            setRoomInfo(checkHasRoomResponse.result);

            await queryClient.invalidateQueries({ queryKey: [`/rooms/${roomInfo.roomId}/myRoom`] });

            break;

          case 'ARRIVE_CHAT':
            await queryClient.invalidateQueries({ queryKey: [`/chatrooms`] });
            await queryClient.invalidateQueries({
              queryKey: [`/chats/chatrooms/${targetId}`, targetId],
            });

          default:
            console.log('data: ', data);
            console.log(`Unhandled actionType: ${actionType}`);
        }

        await queryClient.invalidateQueries({ queryKey: ['/notificationLogs'] });
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
