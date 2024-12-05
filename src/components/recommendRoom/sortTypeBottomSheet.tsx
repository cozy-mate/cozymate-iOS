import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import CheckIcon from '@assets/recommendRoom/check.svg';
import ColorCheckIcon from '@assets/recommendRoom/colorCheck.svg';

interface SortTypeBottomSheetProps {
  isVisible: boolean;
  currentType: string;
  setType: any;
  closeModal: any;
}

const SortTypeBottomSheet: React.FC<SortTypeBottomSheetProps> = ({
  isVisible,
  currentType,
  setType,
  closeModal,
}) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View onTouchEnd={closeModal} className="flex h-screen w-screen justify-end bg-modalBack">
        <View
          // 상단의 closeModal을 받지 않도록 지정
          onTouchEnd={(e) => e.stopPropagation()}
          className="rounded-t-[20px] bg-white p-6 pb-8 pt-2"
        >
          <TouchableOpacity
            className="flex flex-row items-center space-x-2 border-b border-b-[#F6f6f6] py-4"
            onPress={() => {
              setType('LATEST');
            }}
          >
            {currentType === 'LATEST' ? <ColorCheckIcon /> : <CheckIcon />}
            <Text className="text-base font-medium text-basicFont">최신순</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center space-x-2 border-b border-b-[#F6f6f6] py-4"
            onPress={() => {
              setType('AVERAGE_RATE');
            }}
          >
            {currentType === 'AVERAGE_RATE' ? <ColorCheckIcon /> : <CheckIcon />}
            <Text className="text-base font-medium text-basicFont">평균일치율순</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center space-x-2 py-4"
            onPress={() => {
              setType('CLOSING_SOON');
            }}
          >
            {currentType === 'CLOSING_SOON' ? <ColorCheckIcon /> : <CheckIcon />}
            <Text className="text-base font-medium text-basicFont">마감임박순</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortTypeBottomSheet;
