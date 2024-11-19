import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import StarIcon from '@assets/roomMate/star.svg';
import BlueRightArrow from '@assets/roomMate/blueRightArrow.svg';

interface NoLifeStyleComponentProps {
  pressFunc: () => void;
  isChipClicked: boolean;
}

const NoLifeStyleComponent: React.FC<NoLifeStyleComponentProps> = ({
  pressFunc,
  isChipClicked,
}) => {
  const { profile } = useProfileStore();

  return (
    <View className="flex flex-col items-center pb-4 pt-8">
      <StarIcon />
      <View className="p-4">
        {isChipClicked ? (
          <Text className="text-center text-xs font-medium text-disabledFont">
            {profile.nickname}님, 라이프스타일을 입력하면{'\n'}
            나와 똑같은 답변을 한 사용자를 확인할 수 있어요!
          </Text>
        ) : (
          <Text className="text-center text-xs font-medium text-disabledFont">
            {profile.nickname}님, 라이프스타일을 입력하면{'\n'}더 많은 사용자들의 정보를 확인할 수
            있어요!
          </Text>
        )}

        <Pressable
          onPress={pressFunc}
          className="flex flex-row items-center justify-center space-x-2 p-2"
        >
          <Text className="text-center text-base font-semibold text-main1">
            라이프스타일 입력하러가기
          </Text>
          <BlueRightArrow />
        </Pressable>
      </View>
    </View>
  );
};

export default NoLifeStyleComponent;
