import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CheckIcon from '@assets/recommendRoom/check.svg';
import ColorCheckIcon from '@assets/recommendRoom/colorCheck.svg';

interface SortTypeBottomSheetProps {
  currentType: string;
  setType: any;
}

const SortTypeBottomSheet: React.FC<SortTypeBottomSheetProps> = ({ currentType, setType }) => {
  const filterItems = [
    { value: 'LATEST', title: '최신순' },
    { value: 'AVERAGE_RATE', title: '평균일치율순' },
    { value: 'CLOSING_SOON', title: '마감임박순' },
  ];

  return (
    <View className="rounded-t-[20px] bg-white p-6 pb-8 pt-2">
      {filterItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setType(item.value)}
          className={`flex flex-row items-center space-x-2 py-4 ${
            index === filterItems.length - 1 ? 'border-b-0' : 'border-b border-b-[#F6f6f6]'
          }`}
        >
          <View className="p-2">
            {currentType === item.value ? <ColorCheckIcon /> : <CheckIcon />}
          </View>
          <Text
            className={`text-sm  ${
              currentType === item.value ? 'font-semibold text-main1' : 'font-medium text-basicFont'
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortTypeBottomSheet;
