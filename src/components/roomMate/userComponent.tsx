import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { getRoommateLifeStyleIcon } from '@utils/getLifeStyleIcon';

interface UserComponentProps {
  user: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      majorName: string;
      persona: number;
    };
    equality: number;
    preferenceStats: Record<string, string | number>;
  };
  toUserDetail: (id: number) => void;
}

const UserComponent: React.FC<UserComponentProps> = ({ user, toUserDetail }) => {
  return (
    <Pressable
      onPress={() => toUserDetail(user.memberDetail.memberId)}
      className="mb-6 flex flex-col rounded-xl border border-disabled px-4 py-5"
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">
          {user.memberDetail.nickname}
        </Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">
            내 라이프스타일과 일치율
          </Text>
          <Text className="text-base font-medium text-main1">
            {user.equality !== null ? user.equality : '?? '}%
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {Object.entries(user.preferenceStats).map(([key, value], index) => (
          <View key={index} className="flex w-[60px] flex-col items-center">
            {getRoommateLifeStyleIcon(key, value)}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default UserComponent;
