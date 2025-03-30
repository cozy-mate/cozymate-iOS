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
        className="flex h-screen w-screen items-center justify-center bg-black/55"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="min-w-[3/4] gap-y-[20px] rounded-xl bg-white p-[32px]"
        >
          <View className={`flex flex-col ${subtitle ? 'space-y-1' : ''}`}>
            <Text className="text-center text-16 font-600 leading-16 text-emphasizedFont">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-center text-sm font-medium text-colorFont">{subtitle}</Text>
            )}
          </View>

          <View className="flex flex-row justify-center gap-x-[12px]">
            <Pressable
              onPress={leftButtonFunc}
              className="rounded-lg bg-disabledColor px-[28px] py-[14px]"
            >
              <Text className="px-[14px] text-center text-14 font-600 leading-14 text-disabledFont">
                {leftButtonText}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                rightButtonFunc();
                closeFunc();
              }}
              className="rounded-lg bg-mainColor px-[28px] py-[14px]"
            >
              <Text className="px-[14px] text-center text-14 font-600 leading-14 text-white">
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
