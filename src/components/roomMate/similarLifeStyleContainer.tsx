import { getProfileImage } from '@utils/profileImage';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Config from 'react-native-config';

interface SimilarLifeStyleContainerProps {
  user: UserItem;
  toUserDetail: (user: UserItem) => void;
}

type UserItem = {
  memberId: number;
  memberName: string;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  numOfRoommate: number;
  equality: number;
};

const SimilarLifeStyleContainer: React.FC<SimilarLifeStyleContainerProps> = ({
  user,
  toUserDetail,
}) => {
  return (
    <Pressable onPress={() => toUserDetail(user)}>
      <View className="flex flex-row rounded-xl mb-3 p-4 w-[122px] justify-center border-[1px] border-[#D9D9D9] mr-3">
        <View className="flex-col items-center">
          <View className="bg-colorBox px-2 py-[2px] mb-3 rounded-sm">
            <Text className="text-[10px] font-medium text-colorFont text-center">
              {user.memberAge}살 | {user.numOfRoommate}인 1실
            </Text>
          </View>
          {getProfileImage(user.memberPersona, 60, 60)}
          <Text className="mt-2 text-sm font-semibold text-basicFont">{user.memberNickName}</Text>
          <Text className="text-xs font-medium text-main1">{user.equality}%</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SimilarLifeStyleContainer;
