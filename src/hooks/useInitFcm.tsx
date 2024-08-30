import messaging from '@react-native-firebase/messaging';
import { loggedInState } from '../recoil/recoil';
import { useRecoilState } from 'recoil';
import { setFcmToken } from '@utils/fcm';
import { postFcmToken } from '@server/api/fcm';
import notifee from '@notifee/react-native';
import { getUniqueId } from 'react-native-device-info';
import { Alert } from 'react-native';

const useInitFcm = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);

  // 로직 정리
  // 1. 가장 처음 앱을 켰을 때
  // -> device ID 생성 및 저장
  // 2. 로그인 성공 시(재로그인 포함)
  // -> FCM 토큰 요청, 저장, 서버에 공유
  // -> 서버는 같은 사용자가 같은 토큰 올 시
  // 3. 로그아웃 시
  // -> FCM 토큰 삭제

  const getDeviceId = async () => {
    const deviceId = await getUniqueId();
    return 'ios-' + deviceId;
  };
  // 새로운 토큰 발급
  const refreshFcmToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      await messaging()
        .deleteToken()
        .then(async (res) => {
          const newToken = await messaging().getToken();
          // console.log('새로 발급된 FCM 토큰:', newToken);
          await setFcmToken(newToken);
        })
        .catch(async (e) => {
          // console.log('FCM 토큰 재발급 중 오류 발생:', e);
          // 새로운 FCM 토큰 요청
          // console.log('재발급 시도중...');
          const newToken = await messaging().getToken();
          // console.log('새로 발급된 FCM 토큰:', newToken);
          await setFcmToken(newToken);
        });
    }
  };

  const requestUserPermission = async () => {
    try {
      // 같은 기기면 매번 같은 토큰 줌
      const token = await messaging().getToken();
      // console.log(token);
      const deviceId = await getDeviceId();
      await setFcmToken(token);
      const response = await postFcmToken({ deviceId: deviceId!, token });
      // console.log('FCM Token registered successfully:', response);
    } catch (error: any) {
      console.error('Failed to register FCM token:', error.response);
    }
  };

  const foregroundNotificationListener = () => {
    messaging().onMessage(async (remoteMessage: any) => {
      // TODO : Replace with foreground toast notification
      // console.log('Foreground Notification:', remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage?.data.title.replace(/{(.*?)}/g, '$1') || '알림',
        body: remoteMessage?.data.body.replace(/{(.*?)}/g, '$1') || '새로운 메시지가 도착했습니다.',
        ios: {
          sound: 'default',
        },
      });
    });
  };

  const initFcm = () => {
    // console.log('FCM initialized');
    if (isLoggedIn) {
      requestUserPermission();
      foregroundNotificationListener();
    }
  };

  return {
    getDeviceId,
    refreshFcmToken,
    initFcm,
  };
};

export default useInitFcm;
