import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

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
      <View className="flex flex-row items-center justify-between px-5 mt-2 mb-4">
        <Pressable onPress={leftPressFunc} className="p-2 mr-8">
          <BackButton />
        </Pressable>
        <Text className="text-base font-semibold text-basicFont">{title}</Text>
        {canNext ? (
          <Pressable onPress={rightPressFunc}>
            <View className="px-5 py-[10px] bg-sub1 rounded-md">
              <Text className="text-xs font-semibold text-main1">{buttonString}</Text>
            </View>
          </Pressable>
        ) : (
          <View className="px-5 py-[10px] bg-white rounded-md">
            <Text className="text-xs font-semibold text-white">{buttonString}</Text>
          </View>
        )}
      </View>
      <View className="relative w-full h-2 bg-box">
        <View
          style={{ width: progressWidth }}
          className={`absolute top-0 z-10 h-2 bg-main1 rounded-r-xl ${
            progressWidth === screenWidth && 'rounded-none'
          }`}
        />
      </View>
    </View>
  );
};

export default BackHeader;
