import React from 'react';
import { Text, View, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import {
  lifestyleOptions,
  LifestyleOptionKey,
  getRoommateLifeStyleIcon,
} from '@utils/getLifeStyleIcon';

interface RecommendUserComponentProps {
  user: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string | null;
      majorName: string | null;
      persona: number;
    };
    equality: number | null;
    preferenceStats: Record<string, string | number | null>;
  };
  toUserDetail: (id: number) => void;
  onLayout: (event: LayoutChangeEvent) => void;
}

const RecommendUserComponent: React.FC<RecommendUserComponentProps> = ({
  user,
  toUserDetail,
  onLayout,
}) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const isLifestyleOptionKey = (key: string): key is LifestyleOptionKey => {
    return key in lifestyleOptions;
  };

  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth - 40;

  return (
    <Pressable
      onPress={() => toUserDetail(user.memberDetail.memberId)}
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
      onLayout={onLayout}
      style={{ width: calculatedWidth }}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">
          {user.memberDetail.nickname}
        </Text>
        <Text className="text-base font-medium text-main1">
          {user.equality !== null && hasLifeStyle ? user.equality : '?? '}%
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {Object.entries(user.preferenceStats).map(([key, value], index) => (
          <View key={index} className="flex w-[60px] flex-col items-center">
            {isLifestyleOptionKey(key) ? getRoommateLifeStyleIcon(key, value) : null}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default RecommendUserComponent;
