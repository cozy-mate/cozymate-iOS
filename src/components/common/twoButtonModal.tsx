import React from 'react';
import { View, Modal, Text, Pressable, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  message: string;
  cancelText: string;
  submitText: string;
  isVisible: boolean;
  closeModal: any;
  onSubmit: any;
};

const TwoButtonModal = (props: Props) => {
  const { title, message, cancelText, submitText, onSubmit, isVisible, closeModal } = props;
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
        className="flex w-full h-full justify-center items-center"
        onTouchEnd={closeModal}
      >
        <View
          className="flex flex-col w-5/6 justify-center items-center bg-white px-10 py-8 rounded-xl z-10"
          onTouchEnd={handleTouchEnd}
        >
          <Text className="text-emphasizedFont font-semibold text-lg mb-1">{title}</Text>
          <Text className="text-colorFont font-normal text-sm mb-5">{message}</Text>
          <View className="flex flex-row justify-center space-x-2">
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

export default TwoButtonModal;
