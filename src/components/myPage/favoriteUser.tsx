import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { getRoommateLifeStyleIcon } from '@utils/getLifeStyleIcon';

import { FavoriteUserRoomScreenProps } from '@type/param/stack';

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
      preferenceStats: {
        stat: string;
        value: string | number;
        color: string;
      }[];
    };
  };
  navigation: FavoriteUserRoomScreenProps['navigation'];
}

const FavoriteUser: React.FC<FavoriteUserProps> = ({ userData, navigation }) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('UserDetailScreen', {
          memberId: userData.memberStatPreferenceDetail.memberDetail.memberId,
        })
      }
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">
          {userData.memberStatPreferenceDetail.memberDetail.nickname}
        </Text>

        <Text className="text-base font-medium text-main1">
          {userData.memberStatPreferenceDetail.equality !== null && hasLifeStyle
            ? userData.memberStatPreferenceDetail.equality
            : '?? '}
          %
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {userData.memberStatPreferenceDetail.preferenceStats.map((preference, index) => (
          <View key={index} className="flex w-[60px] flex-col items-center">
            {getRoommateLifeStyleIcon(preference.stat, preference.color, preference.value)}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default FavoriteUser;
