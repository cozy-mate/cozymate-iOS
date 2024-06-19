import React from 'react';
import { View, Text, Pressable } from 'react-native';

import NavigateIcon from '@assets/roomMate/navigateNext.svg';

interface SameAnswerContainerProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

type User = {
  image: React.FC;
  index: number;
  age: number;
  type: string;
  name: string;
  percent: number;
};

const SameAnswerContainer: React.FC<SameAnswerContainerProps> = ({ users, setUsers }) => {
  return (
    <View className="flex px-4 bg-white rounded-t-[30px] pt-6">
      <View className="flex flex-row justify-between mb-3 leading-loose">
        <View className="flex-col">
          <Text className="text-base font-semibold text-[#46464B] px-1 tracking-tight">
            원하는 칩을 선택하면
          </Text>
          <Text className="text-base font-semibold text-[#46464B] px-1 tracking-tight">
            나와 똑같은 답변을 한 사용자만 떠요!
          </Text>
        </View>
        <Pressable>
          <View className="pl-1 pr-2 py-[6px]">
            <NavigateIcon />
          </View>
        </Pressable>
      </View>

      {users.map((user) => (
        <View className="flex flex-row border-2 border-[#E6E6E6] rounded-[12px] mb-3 p-4">
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex flex-row items-center">
              <user.image />
              <View className="flex-col ml-2">
                <View className="flex-row mb-1">
                  <Text className="bg-[#F3F6FA] px-2 py-[2px] mr-1 text-[10px] font-medium text-[#808997]">
                    {user.age}살
                  </Text>
                  <Text className="bg-[#F3F6FA] px-2 py-[2px] text-[10px] font-medium text-[#808997]">
                    {user.type}
                  </Text>
                </View>
                <Text className="px-1 text-[14px] font-semibold text-[#61666D]">{user.name}</Text>
              </View>
            </View>
            <Text className="text-[#808997]">{user.percent}%</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SameAnswerContainer;
