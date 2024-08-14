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
        style={{
          backgroundColor: 'rgba(0, 0, 0,0.5)',
        }}
        className="flex items-center justify-center w-full h-full"
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
                onPress={closeModal}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingHorizontal: 28,
                  paddingVertical: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#E6E6E6',
                }}
              >
                <Text style={{ color: '#A9A9A9', fontWeight: '600', fontSize: 14 }}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onSubmit}
              style={{
                flex: 1,
                borderRadius: 12,
                paddingHorizontal: 28,
                paddingVertical: 16,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#68A4FF',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>{submitText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ButtonModal;
