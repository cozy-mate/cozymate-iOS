import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

import XButton from '@assets/xButton.svg';
import TableViewImage from '@assets/userDetail/phone.svg';

interface TableViewModalProps {
  isVisible: boolean;
  closeFunc: any;
  buttonText: string;
  buttonFunc: any;
}

const TableViewModal: React.FC<TableViewModalProps> = ({
  isVisible,
  closeFunc,
  buttonText,
  buttonFunc,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View className="flex h-screen w-screen items-center justify-center bg-modalBack">
        <View className="flex min-w-[3/4] flex-col rounded-xl bg-white px-4 pb-6 pt-3">
          <Pressable onPress={closeFunc} className="mb-2 ml-auto">
            <XButton />
          </Pressable>

          <View className="flex items-center space-y-5">
            <TableViewImage />

            <View className="space-y-6 px-[18px]">
              <Text className="text-center text-sm font-medium text-basicFont">
                라이프스타일을 입력하면{'\n'}나와 상대방의 정보를 쉽게 비교할 수 있어요
              </Text>

              <Pressable onPress={buttonFunc} className="rounded-lg bg-main1 px-7 py-3.5">
                <Text className="px-3.5 text-center text-sm font-semibold text-white">
                  {buttonText}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TableViewModal;
