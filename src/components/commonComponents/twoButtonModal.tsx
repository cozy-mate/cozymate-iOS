import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface TwoButtonModalProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
  closeFunc: any;
  leftButtonText: string;
  leftButtonFunc: any;
  rightButtonText: string;
  rightButtonFunc: any;
}

const TwoButtonModal: React.FC<TwoButtonModalProps> = ({
  isVisible,
  title,
  subtitle,
  closeFunc,
  leftButtonText,
  leftButtonFunc,
  rightButtonText,
  rightButtonFunc,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View
        onTouchEnd={closeFunc}
        className="flex h-screen w-screen items-center justify-center bg-modalBack"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="min-w-[3/4] space-y-5 rounded-xl bg-white p-8"
        >
          <View className={`flex flex-col ${subtitle ? 'space-y-1' : ''}`}>
            <Text className="text-center text-base font-semibold text-basicFont">{title}</Text>
            {subtitle && (
              <Text className="text-center text-sm font-medium text-colorFont">{subtitle}</Text>
            )}
          </View>

          <View className="flex flex-row justify-center space-x-3">
            <Pressable onPress={leftButtonFunc} className="rounded-lg bg-disabled px-7 py-3.5">
              <Text className="px-3.5 text-center text-sm font-semibold text-disabledFont">
                {leftButtonText}
              </Text>
            </Pressable>

            <Pressable onPress={rightButtonFunc} className="rounded-lg bg-main1 px-7 py-3.5">
              <Text className="px-3.5 text-center text-sm font-semibold text-white">
                {rightButtonText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TwoButtonModal;
