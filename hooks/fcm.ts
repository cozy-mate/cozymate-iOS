import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import { getDeviceId } from '@/utils/fcm/deviceUtil';
import { requestUserPermission } from '@/utils/fcm/fcmTokenUtil';

const resetFcmToken = async (): Promise<void> => {
  try {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      await messaging().deleteToken();
      //console.log('FCM 토큰이 재발급을 위해 삭제되었습니다.');
    }
  } catch (error: any) {
    //console.error('FCM 토큰 재발급 중 오류:', error.message || error);
  }
};

const initFcm = async (): Promise<void> => {
  try {
    //console.log('FCM 초기화 시작');
    await requestUserPermission();
    //foregroundNotificationListener();
    //console.log('FCM 초기화 완료');
  } catch (error: any) {
    //console.error('FCM 초기화 중 오류:', error.message || error);
  }
};

export const useFcmMessage = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      notifee.displayNotification({
        title:
          typeof remoteMessage?.notification?.title === 'string'
            ? remoteMessage.notification.title
            : '알림',
        body:
          typeof remoteMessage?.notification?.body === 'string'
            ? remoteMessage.notification.body
            : '새로운 메시지가 도착했습니다.',
        ios: {
          sound: 'default',
        },
        data: remoteMessage?.data,
      });
    });

    return unsubscribe;
  }, []);
};

export const useInitFcm = async () => {
  useEffect(() => {
    initFcm();
  }, []);
};

export const useResetFcmToken = () => {
  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    resetFcmToken();
  }, [getDeviceId, resetFcmToken]);
};
