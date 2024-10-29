import React from 'react';
import { Text, View } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import { getProfileImage } from '@utils/profileImage';

import RightArrow from '@assets/smallRightArrow.svg';

interface MemberComponentProps {
  index: number;
  memberData: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  };
  length: number;
}

const MemberComponent: React.FC<MemberComponentProps> = ({ index, memberData, length }) => {
  const { profile } = useProfileStore();

  return (
    <View
      className={`flex flex-row justify-between border-b border-b-[#F1F2F4] py-3 ${
        index === 0 && 'pt-2'
      } ${index === length - 1 && 'border-b-0 pb-2'}`}
    >
      <View className="flex flex-row items-center">
        {getProfileImage(memberData.persona, 24, 24)}
        <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
          {memberData.nickname}
          {memberData.nickname === profile.nickname && (
            <Text className="text-colorFont"> (나)</Text>
          )}
          {/* {memberData.isChief && <Text className="text-colorFont"> (방장)</Text>} */}
        </Text>
      </View>

      <View className="flex flex-row items-center">
        {memberData.nickname !== profile.nickname && (
          <Text className="mr-2 text-sm font-medium text-colorFont">
            {memberData.mateEquality !== null ? memberData.mateEquality : '?? '}%
          </Text>
        )}
        <RightArrow />
      </View>
    </View>
  );
};

export default MemberComponent;
