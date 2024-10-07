import { profileState } from '@recoil/recoil';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import StarIcon from '@assets/roomMate/star.svg';

const NoLifeStyleComponent: React.FC = () => {
  const profile = useRecoilValue(profileState);

  return (
    <View className="flex flex-col items-center rounded-xl bg-[#F6f6f6] pt-8 pb-4 w-full">
      <StarIcon />
      <View className="p-4">
        <Text className="text-xs font-medium text-center text-disabledFont">
          {profile.nickname}님, 라이프스타일을 입력하면{'\n'}
          나와 똑같은 답변을 한 사용자를 확인할 수 있어요!
        </Text>

        <Pressable className="p-2">
          <Text className="text-base font-semibold text-center text-main1">
            라이프스타일 입력하러가기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NoLifeStyleComponent;
