import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import { getProfileImage } from '@utils/profileImage';

import RightArrow from '@assets/smallRightArrow.svg';

interface MemberItem {
  memberId: number;
  mateId: number;
  nickname: string;
  persona: number;
  mateEquality: number;
}

interface MemberComponentProps {
  index: number;
  memberData: MemberItem;
  length: number;
  managerMemberId: number;
  pressFunc: (member: MemberItem) => void;
}

const MemberComponent: React.FC<MemberComponentProps> = ({
  index,
  memberData,
  length,
  managerMemberId,
  pressFunc,
}) => {
  const { profile } = useProfileStore();

  return (
    <Pressable
      onPress={() => pressFunc(memberData)}
      className={`flex flex-row justify-between border-b border-b-[#F1F2F4] py-3 ${
        index === 0 && 'pt-2'
      } ${index === length - 1 && 'border-b-0 pb-2'}`}
    >
      <View className="flex flex-row items-center">
        {getProfileImage(memberData.persona, 24, 24)}
        <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
          {memberData.nickname}
          {memberData.memberId === managerMemberId && (
            <Text className="text-colorFont"> (방장)</Text>
          )}
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
    </Pressable>
  );
};

export default MemberComponent;
