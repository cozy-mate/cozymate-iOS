import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTooltip = async () => {
  await AsyncStorage.setItem('tooltip', 'TRUE');
};

export const closeTooltip = async () => {
  await AsyncStorage.setItem('tooltip', 'FALSE');
};

export const getTooltip = async (): Promise<string | null> => {
  return AsyncStorage.getItem('tooltip');
};
