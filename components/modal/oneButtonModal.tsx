import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';

interface OneButtonModalProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
  closeFunc: any;
  buttonText: string;
  buttonFunc: any;
}

const OneButtonModal: React.FC<OneButtonModalProps> = ({
  isVisible,
  title,
  subtitle,
  closeFunc,
  buttonText,
  buttonFunc,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View
        onTouchEnd={closeFunc}
        className="flex h-screen w-screen items-center justify-center bg-black/55"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-11/12 gap-y-[20px] rounded-xl bg-white p-[32px]"
        >
          <View className={`flex flex-col ${subtitle ? 'space-y-1' : ''}`}>
            <Text className="text-center Semibold16 text-emphasizedFont">{title}</Text>
            {subtitle && (
              <Text className="text-center text-sm font-medium text-colorFont">{subtitle}</Text>
            )}
          </View>

          <View className="flex flex-row justify-center gap-x-[12px]">
            <Pressable
              onPress={buttonFunc}
              className="rounded-lg bg-mainColor px-[28px] py-[14px] flex-1"
            >
              <Text className="px-[14px] text-center Semibold14 text-white">{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OneButtonModal;
