import { getUniqueId } from 'react-native-device-info';
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

const getDeviceIdWithPrefix = async (): Promise<string> => {
  const deviceId = await getUniqueId();
  return `ios-${deviceId}`;
};
