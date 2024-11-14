import React from 'react';
import { View, Text, Modal, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

interface CompleteModalProps {
  closeModal: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: () => void | React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ closeModal, submitFunc }) => {
  return (
    <Modal transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-modalBack px-5">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center justify-between rounded-xl bg-white p-8">
              <Text className="mb-5 text-center text-base font-semibold text-emphasizedFont">
                삭제가 완료되었습니다.
              </Text>

              <Pressable onPress={submitFunc} className="rounded-lg bg-main1 px-7 py-3.5">
                <Text className="text-center text-sm font-semibold text-white">확인</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CompleteModal;
