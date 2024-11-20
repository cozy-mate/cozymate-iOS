import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

import { CozyHomeScreenProps } from '@type/param/stack';

interface RequestUsersComponentProps {
  navigation: CozyHomeScreenProps['navigation'];
  userList: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  }[];
}

const RequestUsersComponent: React.FC<RequestUsersComponentProps> = ({ navigation, userList }) => {
  const toUserDetail = (memberId: number) => {
    navigation.navigate('UserDetailScreen', { memberId: memberId });
  };

  return (
    <View className="px-5">
      <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
        {userList.length}개의{'\n'}방 참여 요청이 도착했어요
      </Text>

      <View className="flex flex-col">
        {userList.map((user, index) => (
          <Pressable
            key={user.memberId}
            onPress={() => toUserDetail(user.memberId)}
            className={`flex flex-row justify-between border-b border-b-[#f6f6f6] py-[22px] ${
              index === 0 && 'pt-2.5'
            } ${index === userList.length - 1 && 'border-b-0 pb-2.5'}`}
          >
            <View className="flex flex-row space-x-2">
              {getProfileImage(user.persona, 28, 28)}
              <Text className="text-base font-semibold text-emphasizedFont">{user.nickname}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text
                className={`text-base font-medium ${
                  user.mateEquality < 50 ? 'text-colorFont' : 'text-main1'
                }`}
              >
                {user.mateEquality !== null ? user.mateEquality : '?? '}%
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default RequestUsersComponent;
