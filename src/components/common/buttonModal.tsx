import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  message: string;
  cancelText: string;
  submitText: string;
  isVisible: boolean;
  closeModal: any;
  onSubmit: any;
  buttonCount: number;
};

const ButtonModal = (props: Props) => {
  const { title, message, cancelText, submitText, onSubmit, isVisible, closeModal, buttonCount } =
    props;

  // Propagation 방지용
  const handleTouchEnd = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        className="flex items-center justify-center w-full h-full bg-modalBack"
        onTouchEnd={closeModal}
      >
        <View
          className="z-10 flex flex-col items-center justify-center w-5/6 px-10 py-8 bg-white rounded-xl"
          onTouchEnd={handleTouchEnd}
        >
          <Text className="mb-1 text-lg font-semibold text-emphasizedFont">{title}</Text>
          <Text className="mb-5 text-sm font-normal text-colorFont">{message}</Text>
          <View className="flex flex-row justify-center space-x-2">
            {buttonCount === 2 && (
              <TouchableOpacity
                className="items-center justify-center flex-1 py-4 rounded-lg bg-disabled px-7"
                onPress={closeModal}
              >
                <Text className="text-sm font-semibold leading-4 text-disabledFont">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="items-center justify-center flex-1 py-4 rounded-lg bg-main1 px-7"
              onPress={onSubmit}
            >
              <Text className="text-sm font-semibold leading-4 text-white">{submitText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ButtonModal;
