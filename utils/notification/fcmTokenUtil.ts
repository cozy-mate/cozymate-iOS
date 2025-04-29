import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { getDeviceId } from 'react-native-device-info';

import { postFcmToken } from '@/apis/fcm/fcm';

export const hasFcmToken = async (): Promise<boolean> => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
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
    return true;
  } catch (e) {
    console.error('Error deleting FCM Token:', e);
    return false;
  }
};

export const requestUserPermission = async (): Promise<void> => {
  try {
    const hasToken = await hasFcmToken();
    if (!hasToken) {
      const token = await messaging().getToken();
      const deviceId = await getDeviceId();
      await setFcmToken(token);
      await postFcmToken({ deviceId, token });
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const deactivateFcmToken = async (): Promise<void> => {
  try {
    await messaging().deleteToken();

    await deleteFcmToken();
  } catch (error: any) {
    console.error('FCM 토큰 비활성화 중 오류 발생:', error.message || error);
  }
};
