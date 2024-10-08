import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

interface SameAnswerContainerProps {
  index: number;
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

const SameAnswerContainer: React.FC<SameAnswerContainerProps> = ({ index, user, toUserDetail }) => {
  return (
    <Pressable onPress={() => toUserDetail(user)} className="w-full">
      <View
        className={`flex flex-row border-b border-b-[#F6F6F6] px-3 py-[30px] ${
          index === 0 && 'pt-[18px]'
        }  ${index === 4 && 'border-b-0 pb-[18px]'}`}
      >
        <View className="flex w-full flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            {getProfileImage(user.memberPersona, 46, 46)}
            <View className="ml-2 flex-col">
              <View className="mb-1.5 flex-row">
                <View className="mr-1.5 rounded-[4px] bg-colorBox">
                  <Text className="px-2 py-[2px] text-xs font-medium text-colorFont">
                    {user.memberAge}살
                  </Text>
                </View>
                <View className="rounded-[4px] bg-colorBox">
                  <Text className="px-2 py-[2px] text-xs font-medium text-colorFont ">
                    {user.numOfRoommate}인 1실
                  </Text>
                </View>
              </View>
              <Text className="px-1 text-[14px] font-semibold text-[#61666D]">
                {user.memberNickName}
              </Text>
            </View>
          </View>
          <Text className={`font-medium ${user.equality > 49 ? 'text-main1' : 'text-colorFont'}`}>
            {user.equality}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SameAnswerContainer;
