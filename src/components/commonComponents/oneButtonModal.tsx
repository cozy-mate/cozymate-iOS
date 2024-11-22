import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface OneButtonModalProps {
  isVisible: boolean;
  title: string;
  closeFunc: any;
  buttonText: string;
  buttonFunc: any;
}

const OneButtonModal: React.FC<OneButtonModalProps> = ({
  isVisible,
  title,
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
        <View className="w-3/4 space-y-5 rounded-xl bg-white p-8">
          <Text className="text-center text-base font-semibold text-basicFont">{title}</Text>

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
