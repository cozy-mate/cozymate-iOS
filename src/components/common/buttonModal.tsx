import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  message?: string;
  cancelText?: string;
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
          backgroundColor: 'rgba(0, 0, 0,0.7)',
        }}
        className="flex h-full w-full items-center justify-center"
        onTouchEnd={closeModal}
      >
        <View
          className="z-10 flex w-5/6 flex-col items-center justify-center rounded-xl bg-white px-10 py-8"
          onTouchEnd={handleTouchEnd}
        >
          <Text className="mb-1 text-lg font-semibold text-emphasizedFont">{title}</Text>
          {message === '' ? null : (
            <Text className="mb-5 text-sm font-normal text-colorFont">{message}</Text>
          )}
          <View className="flex flex-row justify-center space-x-2">
            {buttonCount === 2 && (
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  flex: 1,
                  borderRadius: 8,
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
                borderRadius: 8,
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
