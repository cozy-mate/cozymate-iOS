import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import StarIcon from '@assets/roomMate/star.svg';

const NoLifeStyleComponent: React.FC = () => {
  const { profile } = useProfileStore();

  return (
    <View className="flex w-full flex-col items-center pb-4 pt-8">
      <StarIcon />
      <View className="p-4">
        <Text className="text-center text-xs font-medium text-disabledFont">
          {profile.nickname}님, 라이프스타일을 입력하면{'\n'}
          나와 똑같은 답변을 한 사용자를 확인할 수 있어요!
        </Text>

        <Pressable className="p-2">
          <Text className="text-center text-base font-semibold text-main1">
            라이프스타일 입력하러가기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NoLifeStyleComponent;
