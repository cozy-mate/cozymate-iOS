import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { postFcmToken } from '@server/api/fcm';
import { getDeviceId } from 'react-native-device-info';

export const hasFcmToken = async (): Promise<boolean> => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM Token:', fcmToken);
    return fcmToken !== null;
  } catch (e) {
    console.error('Error checking FCM Token:', e);
    return false;
  }
};

export const setFcmToken = async (fcmToken: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('fcmToken', fcmToken);
    return true; // 성공적으로 저장되었음을 반환
  } catch (e) {
    console.error('Error setting FCM Token:', e);
    return false; // 저장 실패
  }
};

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    return fcmToken; // FCM Token 반환
  } catch (e) {
    console.error('Error getting FCM Token:', e);
    return null; // 오류 발생 시 null 반환
  }
};

export const deleteFcmToken = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('fcmToken');
    console.log('FCM Token deleted');
    return true; // 성공적으로 삭제되었음을 반환
  } catch (e) {
    console.error('Error deleting FCM Token:', e);
    return false; // 삭제 실패
  }
};
  // FCM 토큰 요청 및 등록
export const requestUserPermission = async (): Promise<void> => {
    try {
      const hasToken = await hasFcmToken();
      if (!hasToken) {
        const token = await messaging().getToken();
        const deviceId = await getDeviceId();
        await setFcmToken(token);
        await postFcmToken({ deviceId, token });
      } else {
      }
    } catch (error: any) {
    }
  };

export const deactivateFcmToken = async (): Promise<void> => {
    try {
      await messaging().deleteToken();
      //console.log('Firebase Messaging에서 FCM 토큰 삭제 성공.');

      await deleteFcmToken();
      //console.log('AsyncStorage에서 FCM 토큰 삭제 성공.');
    } catch (error: any) {
      console.error('FCM 토큰 비활성화 중 오류 발생:', error.message || error);
    }
  };