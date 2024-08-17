import React from 'react';
import { Modal, View, Text } from 'react-native';

type ControlModalProps = {
  isModalVisible: boolean;
  modalPosition: { top: number; right: number };
  onPressModalClose: () => void;
  onEdit: () => void;
  onSubmit: () => void;
};

const ControlModal = (props: ControlModalProps) => {
  const { isModalVisible, modalPosition, onPressModalClose, onSubmit, onEdit } = props;

  const handleSubmit = () => {
    onSubmit();
    onPressModalClose();
  };

  const handleEdit = () => {
    onEdit();
    onPressModalClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View className="z-10 w-full h-full" onTouchEnd={onPressModalClose}>
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
          <View onTouchEnd={handleEdit}>
            <Text className="text-xs text-emphasizedFont">수정하기</Text>
          </View>
          <View className="w-full border-t-[1px] border-[#EAEAEA] my-2" />
          <View onTouchEnd={handleSubmit}>
            <Text className="text-xs text-emphasizedFont">삭제하기</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ControlModal;
