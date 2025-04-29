import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId } from 'react-native-device-info';

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
