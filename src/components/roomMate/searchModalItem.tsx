import React from 'react';
import { Text, View, Pressable } from 'react-native';

import SelectedBox from '@assets/roomMate/selectedBox.svg';
import NotSelectedBox from '@assets/roomMate/notSelectedBox.svg';

interface ItemList {
  [key: string]: {
    index: number;
    value: string | number;
    name: string;
    meridian?: string;
    select: boolean;
  }[];
}

interface SearchModalItemProps {
  selectedItems: ItemList;
  selectedFilter: string;
  selectFunc: (selectedFilter: string, item: any) => void;
}

const SearchModalItem: React.FC<SearchModalItemProps> = ({
  selectedItems,
  selectedFilter,
  selectFunc,
}) => {
  const isGridStyle =
    selectedFilter === '출생년도' ||
    selectedFilter === '학번' ||
    selectedFilter === 'MBTI' ||
    selectedFilter === '기상시간' ||
    selectedFilter === '취침시간' ||
    selectedFilter === '소등시간';

  const isTime =
    selectedFilter === '기상시간' || selectedFilter === '취침시간' || selectedFilter === '소등시간';

  return (
    <View className="flex flex-row flex-wrap">
      {selectedItems &&
        selectedItems[selectedFilter].map((detail) => (
          <Pressable
            key={detail.index}
            onPress={() => selectFunc(selectedFilter, detail)}
            className="mr-2 flex flex-row items-center"
          >
            <View className="p-[7px]">{detail.select ? <SelectedBox /> : <NotSelectedBox />}</View>
            <Text
              className={`${
                detail.select ? 'font-medium text-basicFont' : 'font-normal text-disabledFont'
              }`}
            >
              {detail.name}
            </Text>
          </Pressable>
        ))}
    </View>
  );
};

export default SearchModalItem;
