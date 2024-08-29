import AsyncStorage from '@react-native-async-storage/async-storage';

const generateDeviceId = () => {
  return `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
};

const initDeviceId = async () => {
  AsyncStorage.setItem('deviceId', generateDeviceId());
};

const hasDeviceId = async () => {
  const deviceId = await AsyncStorage.getItem('deviceId');
  return deviceId !== null;
};

// 첫번째 호출 때 deviceId를 생성하고 저장한다.
// 이후 호출 때는 저장된 deviceId를 반환한다.
export const getDeviceId = async (): Promise<string | null> => {
  const hasdeviceId = await hasDeviceId();
  if (hasdeviceId === false) {
    initDeviceId();
  }
  return AsyncStorage.getItem('deviceId');
};

export const hasFcmToken = async (): Promise<boolean> => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  return fcmToken !== null;
};

export const setFcmToken = async (fcmToken: string): Promise<void> => {
  return AsyncStorage.setItem('fcmToken', fcmToken);
};

export const getFcmToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem('fcmToken');
};

export const deleteFcmToken = async (): Promise<void> => {
  console.log('FCM Token deleted');
  return AsyncStorage.removeItem('fcmToken');
};
