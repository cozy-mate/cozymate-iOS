import { getProfileImage } from '@utils/profileImage';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Config from 'react-native-config';

interface SameAnswerContainerProps {
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

const SameAnswerContainer: React.FC<SameAnswerContainerProps> = ({ user, toUserDetail }) => {
  return (
    <Pressable onPress={() => toUserDetail(user)} className="w-full">
      <View className="flex flex-row border-[1px] border-disabled rounded-[12px] mb-3 p-4">
        <View className="flex flex-row items-center justify-between w-full">
          <View className="flex flex-row items-center">
            {getProfileImage(user.memberPersona, 36, 36)}
            <View className="flex-col ml-2">
              <View className="flex-row mb-1">
                <Text className="bg-colorBox px-2 py-[2px] mr-1 text-[10px] font-medium text-colorFont">
                  {user.memberAge}살
                </Text>
                <Text className="bg-colorBox px-2 py-[2px] text-[10px] font-medium text-colorFont">
                  {user.numOfRoommate}인 1실
                </Text>
              </View>
              <Text className="px-1 text-[14px] font-semibold text-[#61666D]">
                {user.memberNickName}
              </Text>
            </View>
          </View>
          <Text className="text-colorFont">{user.equality}%</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SameAnswerContainer;
