import React from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';

import BackButton from '@assets/backButton.svg';

interface LifeStyleHeaderComponentProps {
  title: string;
  toBack: () => void;
  isComplete: boolean;
  buttonText: string;
  buttonFunc: any;
  width?: number;
}

const LifeStyleHeaderComponent: React.FC<LifeStyleHeaderComponentProps> = ({
  title,
  toBack,
  isComplete,
  buttonText,
  buttonFunc,
  width,
}) => {
  const { width: screenWidth } = Dimensions.get('window');

  const progressWidth = width ? screenWidth * (width / 100) : 0;

  return (
    <View className="mb-5 space-y-4 pb-5">
      <View
        className={`relative flex flex-row items-center px-5 ${
          isComplete ? 'justify-between' : 'justify-start'
        }`}
      >
        <Pressable onPress={toBack}>
          <BackButton />
        </Pressable>

        <Text
          className="absolute text-base font-semibold text-basicFont"
          style={{ left: (Dimensions.get('screen').width - 56) / 2 }}
        >
          {title}
        </Text>

        {isComplete && (
          <Pressable onPress={buttonFunc} className="rounded-md bg-sub1 px-5 py-2.5">
            <Text className="text-sm font-semibold text-main1">{buttonText}</Text>
          </Pressable>
        )}
      </View>

      {width && (
        <View className="relative h-2 w-full bg-box">
          <View
            style={{ width: progressWidth }}
            className={`absolute top-0 z-10 h-2 rounded-r-xl bg-main1 ${
              progressWidth === screenWidth && 'rounded-none'
            }`}
          />
        </View>
      )}
    </View>
  );
};

export default LifeStyleHeaderComponent;
