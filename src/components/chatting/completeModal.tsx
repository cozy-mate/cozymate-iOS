import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface CompleteModalProps {
  closeModal: () => void;
  submitFunc: () => void | React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ closeModal, submitFunc }) => {
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View
        onTouchEnd={closeModal}
        className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-white px-5"
      >
        <View className="flex flex-col items-center justify-between rounded-xl bg-white p-8">
          <Text className="mb-5 text-center text-base font-semibold text-emphasizedFont">
            삭제가 완료되었습니다.
          </Text>

          <Pressable onPress={submitFunc} className="rounded-lg bg-main1 px-7 py-3.5">
            <Text className="text-center text-sm font-semibold text-white">확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CompleteModal;
