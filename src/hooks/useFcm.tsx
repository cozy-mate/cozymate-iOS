import notifee from '@notifee/react-native';
import { getUniqueId } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

import { useLoggedInStore } from '@zustand/member/member';

import { postFcmToken } from '@server/api/fcm';

import { deleteFcmToken, getFcmToken, hasFcmToken, setFcmToken } from '@utils/fcm/fcmTokenUtil';

// 전역 상태 X
//const processedMessageIds = new Set();

// 클로저 사용 O
const createMessageProcessor = () => {
  const processedMessageIds = new Set();

  return (messageId: number) => {
    if (processedMessageIds.has(messageId)) {
      return false; // 이미 처리된 메시지
    }

    processedMessageIds.add(messageId);
    return true; // 새 메시지
  };
};


const useFcm = () => {
  const { loggedIn } = useLoggedInStore();

  // 디바이스 ID 가져오기
  const getDeviceId = async (): Promise<string> => {
    const deviceId = await getUniqueId();
    return `ios-${deviceId}`;
  };

  // FCM 토큰 재발급
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

  // FCM 토큰 요청 및 등록
  const requestUserPermission = async (): Promise<void> => {
    try {
      const hasToken = await hasFcmToken();

      if (!hasToken) {
        const token = await messaging().getToken();
        //console.log('Generated FCM Token:', token);

        const deviceId = await getDeviceId();

        await setFcmToken(token);

        const response = await postFcmToken({ deviceId, token });
        //console.log('FCM 토큰 등록 성공:', response);
      } else {
        //console.log('FCM 토큰 이미 있음');
      }
    } catch (error: any) {
      //console.error('FCM 토큰 요청 및 등록 중 오류:', error.message || error);
    }
  };

  // 포그라운드 알림 리스너
  const foregroundNotificationListener = (): void => {
    const isNewMessage = createMessageProcessor();

    messaging().onMessage((remoteMessage: any) => {

      // 백엔드 서버가 data, notification 둘 다 보내어, 하나의 메세지를 받아도
      // onMessage가 두번 호출되는 함(Firebase SDK 내부 로직)
      // 이를 방지하기 위해 메세지 ID를 기반으로 중복 메세지를 걸러내는 로직
      if (!isNewMessage(remoteMessage.messageId)) {
        //console.log('Duplicate message detected, skipping...');
        return;
      }

      //console.log('Foreground message received:', remoteMessage);

      notifee.displayNotification({
        title: remoteMessage?.data?.title || '알림',
        body: remoteMessage?.data?.body || '새로운 메시지가 도착했습니다.',
        ios: {
          sound: 'default',
        },
      });
    });
  };

  // FCM 초기화
  const initFcm = async (): Promise<void> => {
    try {
      //console.log('FCM 초기화 시작');
      await requestUserPermission();
      foregroundNotificationListener();
      //console.log('FCM 초기화 완료');
    } catch (error: any) {
      //console.error('FCM 초기화 중 오류:', error.message || error);
    }
  };

  // FCM 토큰 비활성화
  const deactivateFcmToken = async (): Promise<void> => {
    try {
      await messaging().deleteToken();
      //console.log('Firebase Messaging에서 FCM 토큰 삭제 성공.');

      await deleteFcmToken();
      //console.log('AsyncStorage에서 FCM 토큰 삭제 성공.');
    } catch (error: any) {
      //console.error('FCM 토큰 비활성화 중 오류 발생:', error.message || error);
    }
  };

  return {
    getDeviceId,
    resetFcmToken,
    initFcm,
    deactivateFcmToken,
  };
};

export default useFcm;
