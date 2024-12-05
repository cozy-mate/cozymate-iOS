import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

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
        className="flex h-screen w-screen items-center justify-center bg-modalBack"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-3/4 space-y-5 rounded-xl bg-white p-8"
        >
          <View className={`flex flex-col ${subtitle ? 'space-y-1' : ''}`}>
            <Text className="text-center text-base font-semibold text-basicFont">{title}</Text>
            {subtitle && (
              <Text className="text-center text-sm font-medium text-colorFont">{subtitle}</Text>
            )}
          </View>

          <Pressable onPress={buttonFunc} className="rounded-lg bg-main1 px-7 py-3.5">
            <Text className="px-3.5 text-center text-sm font-semibold text-white">
              {buttonText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default OneButtonModal;
