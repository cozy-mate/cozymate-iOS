import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

interface MemberContainerProps {
  memberData: {
    nickname: string;
    persona: number;
    equality: number;
    isChief?: boolean;
  }[];
}

const MemberContainer: React.FC<MemberContainerProps> = ({ memberData }) => {
  return (
    <View className="rounded-xl border border-[#F1F2F4] px-4 py-2">
      {memberData.map((member, index) => (
        <View
          key={index}
          className={`flex flex-row justify-between border-b border-b-[#F1F2F4] py-1 ${index === 0 && 'pt-0'} ${index === memberData.length - 1 && 'border-b-0 pb-0'}`}
        >
          <View className="flex flex-row">
            {getProfileImage(member.persona, 24, 24)}
            <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
              {member.nickname}
              {member.isChief && <Text className="text-colorFont"> (방장)</Text>}
            </Text>
          </View>

          <Text className="text-sm font-medium text-colorFont">{member.equality}%</Text>
        </View>
      ))}
    </View>
  );
};

export default MemberContainer;
