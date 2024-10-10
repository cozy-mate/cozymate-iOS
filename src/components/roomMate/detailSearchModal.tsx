import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { View, Modal, Pressable } from 'react-native';

import RenderPressableItems from './filterDetailItem';

interface DetailSearchModalProps {
  onClose: () => void;
}

const DetailSearchModal: React.FC<DetailSearchModalProps> = ({ onClose }) => {
  const [filterItems, setFilterItems] = useState([
    { value: '출생년도', selected: true },
    { value: '학번', selected: false },
    { value: '학과', selected: false },
    { value: '합격여부', selected: false },
    { value: '기상시간', selected: false },
    { value: '취침시간', selected: false },
    { value: '소등시간', selected: false },
    { value: '흡연여부', selected: false },
    { value: '잠버릇', selected: false },
    { value: '에어컨', selected: false },
    { value: '히터', selected: false },
    { value: '생활패턴', selected: false },
    { value: '친밀도', selected: false },
    { value: '물건공유', selected: false },
    { value: '게임여부', selected: false },
    { value: '전화여부', selected: false },
    { value: '공부여부', selected: false },
    { value: '섭취여부', selected: false },
    { value: '청결예민도', selected: false },
    { value: '소음예민도', selected: false },
    { value: '청소빈도', selected: false },
    { value: '음주빈도', selected: false },
    { value: '성격', selected: false },
    { value: 'MBTI', selected: false },
  ]);

  const [selectedValueList, setSelectedValueList] = useState<{ title: string; value: any[] }[]>([]);

  const selectFilter = (index: number) => {
    const updatedItems = filterItems.map((item, i) => ({
      ...item,
      selected: i === index,
    }));
    setFilterItems(updatedItems);
  };

  const selectedFilterItem = filterItems.find((item) => item.selected);

  const selectValue = (title: string, value: any) => {
    setSelectedValueList((prevList) => {
      const existingItem = prevList.find((item) => item.title === title);

      if (existingItem) {
        // Update existing item
        return prevList.map((item) =>
          item.title === title ? { ...item, value: [...item.value, value] } : item,
        );
      } else {
        // Add new item
        return [...prevList, { title, value: [value] }];
      }
    });
  };

  return (
    <Modal transparent={true} animationType="slide">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-end bg-blackBack">
        <View className="flex h-3/4 flex-col justify-between rounded-t-[20px] bg-white px-5 py-3">
          <View className="flex flex-col">
            <Pressable className="mb-2 flex flex-row justify-end" onPress={onClose}>
              <Text>X</Text>
            </Pressable>

            <ScrollView
              className="mb-4 flex flex-row space-x-2 border-b border-b-[#F6F6F6]"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {filterItems.map((item, index) => (
                <Pressable key={index} onPress={() => selectFilter(index)}>
                  <View
                    className={`${item.selected && 'border-b border-b-[#51555C]'} px-1 pb-3 pt-2`}
                  >
                    <Text
                      className={`${item.selected ? 'text-emphasizedFont' : 'text-disabledFont'} text-sm font-medium`}
                    >
                      {item.value}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            {selectedFilterItem && (
              <RenderPressableItems title={selectedFilterItem.value} onSelectValue={selectValue} />
            )}
          </View>

          <View>
            <View
              className={`mb-4 flex flex-row items-center ${selectedValueList.length > 0 ? 'justify-between' : 'justify-end'}`}
            >
              <View className="flex">
                {selectedValueList.map((item, index) => (
                  <ScrollView
                    key={index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 flex flex-row"
                  >
                    {item.value.map((data, dataIndex) => (
                      <View className="rounded-full border border-main1 bg-sub2 py-1 pl-3.5 pr-1.5">
                        <Text key={dataIndex} className="text-sm font-semibold text-main1">
                          {data.name}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                ))}
              </View>
              <Pressable onPress={() => setSelectedValueList([])} className="py-1 pl-3.5 pr-1.5">
                <Text>초기화</Text>
              </Pressable>
            </View>

            <Pressable className="mb-3 rounded-xl bg-main1 p-4">
              <Text className="text-center text-base font-semibold text-white">
                2명의 룸메이트 보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DetailSearchModal;
