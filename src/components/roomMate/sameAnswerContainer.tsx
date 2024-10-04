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
        className={`flex flex-row px-3 py-[30px] border-b-[1px] border-b-[#F6F6F6] ${
          index === 0 && 'pt-[18px]'
        }  ${index === 4 && 'border-b-0 pb-[18px]'}`}
      >
        <View className="flex flex-row items-center justify-between w-full">
          <View className="flex flex-row items-center">
            {getProfileImage(user.memberPersona, 46, 46)}
            <View className="flex-col ml-2">
              <View className="flex-row mb-1.5">
                <View className="rounded-[4px] bg-colorBox mr-1.5">
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
