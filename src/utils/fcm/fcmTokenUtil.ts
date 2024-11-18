import AsyncStorage from '@react-native-async-storage/async-storage';

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
