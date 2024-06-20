import React from 'react';
import { View, Text, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';

import NavigateIcon from '@assets/roomMate/navigateNext.svg';

interface SimilarLifeStyleContainerProps {
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

const SimilarLifeStyleContainer: React.FC<SimilarLifeStyleContainerProps> = ({
  users,
  setUsers,
}) => {
  return (
    <View className="flex px-4 bg-white rounded-tl-[30px] pt-6">
      <View className="flex flex-row justify-between mb-3 leading-loose">
        <View className="flex-col">
          <Text className="text-base font-semibold text-[#46464B] px-1 tracking-tight">
            나와 비슷한 라이프스타일을 갖고 있어요!
          </Text>
        </View>
        <Pressable>
          <View className="pl-1 pr-2 py-[6px]">
            <NavigateIcon />
          </View>
        </Pressable>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex flex-row space-x-3"
      >
        {users.map((user) => (
          <View className="flex flex-row border-2 border-[#E6E6E6] rounded-[12px] mb-3 p-4 w-[122px]">
            <View className="flex-col items-center ">
              <Text className="bg-[#F3F6FA] px-2 py-[2px] mr-1 text-[10px] font-medium text-[#808997]">
                {user.age}살 | {user.type}
              </Text>
              <user.image />
              <Text className="px-1 text-[14px] font-semibold text-[#61666D]">{user.name}</Text>
              <Text className="text-[#68A4FF]">{user.percent}%</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SimilarLifeStyleContainer;
