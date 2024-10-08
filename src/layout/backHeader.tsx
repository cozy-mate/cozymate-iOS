import React from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';

import BackButton from '@assets/backHeader/backButton.svg';

interface BackHeaderProps {
  title?: string;
  buttonString?: string;
  leftPressFunc: () => void;
  rightPressFunc?: () => void;
  canNext?: boolean;
  width?: number;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  buttonString,
  leftPressFunc,
  rightPressFunc,
  canNext,
  width,
}) => {
  const { width: screenWidth } = Dimensions.get('window');

  const progressWidth = width ? screenWidth * (width / 100) : 0;

  return (
    <View className="mb-10">
      <View className="mb-4 mt-2 flex flex-row items-center justify-between px-5">
        <Pressable onPress={leftPressFunc} className="mr-8 p-2">
          <BackButton />
        </Pressable>
        <Text className="text-base font-semibold text-basicFont">{title}</Text>
        {canNext ? (
          <Pressable onPress={rightPressFunc}>
            <View className="rounded-md bg-sub1 px-5 py-[10px]">
              <Text className="text-xs font-semibold text-main1">{buttonString}</Text>
            </View>
          </Pressable>
        ) : (
          <View className="rounded-md bg-white px-5 py-[10px]">
            <Text className="text-xs font-semibold text-white">{buttonString}</Text>
          </View>
        )}
      </View>
      <View className="relative h-2 w-full bg-box">
        <View
          style={{ width: progressWidth }}
          className={`absolute top-0 z-10 h-2 rounded-r-xl bg-main1 ${
            progressWidth === screenWidth && 'rounded-none'
          }`}
        />
      </View>
    </View>
  );
};

export default BackHeader;
