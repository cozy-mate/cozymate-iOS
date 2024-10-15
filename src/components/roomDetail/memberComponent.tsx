import React from 'react';
import { Text, View } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

import RightArrow from '@assets/smallRightArrow.svg';

interface MemberComponentProps {
  index: number;
  memberData: {
    nickname: string;
    persona: number;
    equality: number;
    isChief?: boolean;
  };
}

const MemberComponent: React.FC<MemberComponentProps> = ({ index, memberData }) => {
  return (
    <View
      className={`flex flex-row justify-between border-b border-b-[#F1F2F4] py-3 ${index === 0 && 'pt-2'} ${index === 1 && 'border-b-0 pb-2'}`}
    >
      <View className="flex flex-row items-center">
        {getProfileImage(memberData.persona, 24, 24)}
        <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
          {memberData.nickname}
          {memberData.isChief && <Text className="text-colorFont"> (방장)</Text>}
        </Text>
      </View>

      <View className="flex flex-row items-center">
        <Text className="mr-2 text-sm font-medium text-colorFont">{memberData.equality}%</Text>
        <RightArrow />
      </View>
    </View>
  );
};

export default MemberComponent;
