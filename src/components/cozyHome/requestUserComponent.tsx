import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

interface UserComponentProps {
  index: number;
  length: number;
  userData: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  };
  pressFunc: (memberId: number) => void;
}

const RequestUserComponent: React.FC<UserComponentProps> = ({
  index,
  length,
  userData,
  pressFunc,
}) => {
  return (
    <Pressable
      onPress={() => pressFunc(userData.memberId)}
      className={`flex flex-row justify-between border-b border-b-[#f6f6f6] py-[22px] ${
        index === 0 && 'pt-2.5'
      } ${index === length - 1 && 'border-b-0 pb-2.5'}`}
    >
      <View className="flex flex-row space-x-2">
        {getProfileImage(userData.persona, 28, 28)}
        <Text className="text-base font-semibold text-emphasizedFont">{userData.nickname}</Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text
          className={`text-base font-medium ${
            userData.mateEquality < 50 ? 'text-colorFont' : 'text-main1'
          }`}
        >
          {userData.mateEquality !== null ? userData.mateEquality : '?? '}%
        </Text>
      </View>
    </Pressable>
  );
};

export default RequestUserComponent;
