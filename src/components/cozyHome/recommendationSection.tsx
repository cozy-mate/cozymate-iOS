import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  NativeScrollEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { UserItem, RoomItem } from '@type/cozyHome/cozyHome';

import RightArrow from '@assets/cozyHome/smallRightArrow.svg';

interface RecommendationSectionProps<T> {
  title: string;
  onPressMore: () => void;
  dataList: T[];
  onScrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  snapToInterval: number;
  renderItem: (data: T, index: number, onLayout: (event: LayoutChangeEvent) => void) => JSX.Element;
  onLayout: (event: LayoutChangeEvent) => void;
  currentIndex: number;
}

const RecommendationSection = <T extends UserItem | RoomItem>({
  title,
  onPressMore,
  dataList,
  onScrollHandler,
  snapToInterval,
  renderItem,
  onLayout,
  currentIndex,
}: RecommendationSectionProps<T>): JSX.Element => (
  <View className="px-5">
    <View className="mb-4 flex flex-row items-center justify-between">
      <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">{title}</Text>
      <Pressable className="flex flex-row items-center" onPress={onPressMore}>
        <Text className="mr-1 text-xs font-semibold text-disabledFont">더보기</Text>
        <RightArrow />
      </Pressable>
    </View>

    <ScrollView
      className="flex flex-row"
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={snapToInterval}
      onScroll={onScrollHandler}
      decelerationRate="fast"
      disableIntervalMomentum
      scrollEventThrottle={16}
      bounces={false}
    >
      {dataList.map((data, index) => renderItem(data, index, onLayout))}
    </ScrollView>

    <View className="mt-4 flex flex-row justify-center space-x-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          className={`${
            index === currentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
          } h-2 rounded-full`}
        />
      ))}
    </View>
  </View>
);

export default RecommendationSection;
