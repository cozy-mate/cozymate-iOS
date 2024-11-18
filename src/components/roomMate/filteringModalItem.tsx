import React from 'react';
import { Text, View, Pressable } from 'react-native';

import SelectedBox from '@assets/roomMate/selectedBox.svg';
import NotSelectedBox from '@assets/roomMate/notSelectedBox.svg';

interface Item {
  index: number;
  value: string | number;
  name: string;
  meridian?: string;
  select: boolean;
}

interface FilteringModalItemProps {
  item: Item;
  selectedFilter: string;
  selectFunc: (selectedFilter: string, item: Item) => void;
}

const FilteringModalItem: React.FC<FilteringModalItemProps> = ({
  item,
  selectedFilter,
  selectFunc,
}) => {
  const isGridStyle =
    selectedFilter === 'birthYear' ||
    selectedFilter === 'admissionYear' ||
    selectedFilter === 'MBTI' ||
    selectedFilter === 'wakeUpTime' ||
    selectedFilter === 'sleepingTime' ||
    selectedFilter === 'turnOffTime';

  return (
    <Pressable
      key={item.index}
      onPress={() => selectFunc(selectedFilter, item)}
      className={`flex flex-row items-center ${isGridStyle && 'w-[75px]'}`}
    >
      <View className="p-1.5">{item.select ? <SelectedBox /> : <NotSelectedBox />}</View>
      <Text
        className={`tracking-tight ${
          item.select ? 'font-medium text-basicFont' : 'font-normal text-disabledFont'
        }`}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export default FilteringModalItem;
