import React from 'react';
import { Modal, View, Text } from 'react-native';

type ControlModalProps = {
  isModalVisible: boolean;
  modalPosition: { top: number; right: number };
  onPressModalClose: () => void;
  onSubmit: () => void;
};

const ControlModal = (props: ControlModalProps) => {
  const { isModalVisible, modalPosition, onPressModalClose, onSubmit } = props;

  const handleSubmit = () => {
    onSubmit();
    onPressModalClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View className="w-full h-full z-10" onTouchEnd={onPressModalClose}>
        <View
          style={{
            position: 'absolute',
            top: modalPosition.top,
            right: modalPosition.right,
            backgroundColor: 'white',
            borderColor: '#EBEBEB',
            borderWidth: 2,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <View onTouchEnd={onPressModalClose}>
            <Text className="text-emphasizedFont text-xs">수정하기</Text>
          </View>
          <View className="w-full border-t-[1px] border-[#EAEAEA] my-2" />
          <View onTouchEnd={handleSubmit}>
            <Text className="text-emphasizedFont text-xs">삭제하기</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ControlModal;
