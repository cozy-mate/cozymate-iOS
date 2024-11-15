import React from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

interface LogoutModalProps {
  closeModal: () => void;
  cancelFunc: () => void;
  submitFunc: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ closeModal, cancelFunc, submitFunc }) => {
  return (
    <Modal transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-modalBack px-5">
          <TouchableWithoutFeedback>
            <View className="flex flex-col items-center justify-between rounded-xl bg-white p-8">
              <Text className="mb-5 text-center text-base font-semibold text-emphasizedFont">
                로그아웃 하시겠어요?
              </Text>

              <View className="flex flex-row space-x-3">
                <Pressable onPress={cancelFunc} className="rounded-lg bg-disabled px-7 py-3.5">
                  <Text className="px-3.5 text-center text-sm font-semibold text-disabledFont">
                    취소
                  </Text>
                </Pressable>

                <Pressable onPress={submitFunc} className="rounded-lg bg-main1 px-7 py-3.5">
                  <Text className="px-3.5 text-center text-sm font-semibold text-white">확인</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;
