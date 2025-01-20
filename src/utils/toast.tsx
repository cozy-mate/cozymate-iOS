import React from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDeviceNameSync } from 'react-native-device-info';

import ToastAlert from '@assets/toast/toastFail.svg';
import ToastSuccess from '@assets/toast/toastCheck.svg';

const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="mx-5 mb-5 flex flex-row items-center justify-start rounded-xl bg-toastBackground px-5 py-4">
      {children}
    </View>
  );
};

const isOldModelSync = () => {
  const model = getDeviceNameSync();
  const oldModels = [
    'iPhone 6',
    'iPhone 6 Plus',
    'iPhone 6s',
    'iPhone 6s Plus',
    'iPhone 7',
    'iPhone 7 Plus',
    'iPhone 8',
    'iPhone 8 Plus',
    'iPhone SE',
  ];
  return oldModels.includes(model);
};

const showToast = (success: boolean, text1: string) => {
  Toast.show({
    type: 'custom',
    position: 'bottom',
    bottomOffset: isOldModelSync() ? 60 : 92,

    visibilityTime: 2000,
    props: {
      renderContent: () => (
        <ToastContainer>
          {success ? <ToastSuccess /> : <ToastAlert />}
          <Text className="ml-2 font-semibold text-white">{text1}</Text>
        </ToastContainer>
      ),
    },
  });
};

export const showSuccessToast = (text1: string) => showToast(true, text1);
export const showRejectToast = (text1: string) => showToast(false, text1);
