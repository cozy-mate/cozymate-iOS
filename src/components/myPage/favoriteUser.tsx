import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { LifestyleOptionKey, getRoommateLifeStyleIcon } from '@utils/getLifeStyleIcon';

interface FavoriteUserProps {
  userData: {
    favoriteId: number;
    memberStatPreferenceDetail: {
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
      preferenceStats: Record<LifestyleOptionKey, string | number | null>;
    };
  };
  pressFunc?: (memberId: number) => void;
}

const FavoriteUser: React.FC<FavoriteUserProps> = ({ userData, pressFunc }) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return (
    <Pressable
      //   onPress={() => pressFunc(userData.memberStatPreferenceDetail.memberDetail.memberId)}
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">
          {userData.memberStatPreferenceDetail.memberDetail.nickname}
        </Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">
            내 라이프스타일과 일치율
          </Text>
          <Text className="text-base font-medium text-main1">
            {userData.memberStatPreferenceDetail.equality !== null && hasLifeStyle
              ? userData.memberStatPreferenceDetail.equality
              : '?? '}
            %
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {Object.entries(userData.memberStatPreferenceDetail.preferenceStats).map(
          ([key, value], index) => (
            <View key={index} className="flex w-[60px] flex-col items-center">
              {getRoommateLifeStyleIcon(key, value)}
            </View>
          ),
        )}
      </View>
    </Pressable>
  );
};

export default FavoriteUser;
