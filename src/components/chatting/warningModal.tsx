import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface WarningModalProps {
  closeModal: () => void;
  cancelFunc: () => void;
  submitFunc: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ closeModal, cancelFunc, submitFunc }) => {
  console.log('경고 모달 열림');

  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View
        onTouchEnd={closeModal}
        className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-white px-5"
      >
        <View className="flex flex-col items-center justify-between rounded-xl bg-white p-8">
          <Text className="mb-1 text-center text-base font-semibold text-emphasizedFont">
            쪽지를 삭제하시나요?
          </Text>
          <Text className="text-center text-sm font-medium text-colorFont">
            삭제하면 해당 사용자와 나눴던{'\n'}모든 쪽지 내용이 사라져요
          </Text>

          <View className="mt-5 flex flex-row space-x-3">
            <Pressable onPress={cancelFunc} className="rounded-lg bg-disabled px-7 py-3.5">
              <Text className="text-center text-sm font-semibold text-disabledFont">취소</Text>
            </Pressable>

            <Pressable onPress={submitFunc} className="rounded-lg bg-main1 px-7 py-3.5">
              <Text className="text-center text-sm font-semibold text-white">삭제</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
