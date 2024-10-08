import React, { useState } from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';

interface UserComponentProps {
  index: number;
  userData: {
    name: string;
    hashTag: string[];
    equality: number;
  };
}

const UserComponent: React.FC<UserComponentProps> = ({ index, userData }) => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.65;

  const [hasTagLen, setHashTagLen] = useState<number>(0);

  return (
    <Pressable
      style={{ width: containerWidth }}
      className="mr-5 rounded-xl border border-disabled p-4"
    >
      <View className="flex flex-row">
        {userData.hashTag.map((data, index) => (
          <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-[2px]">
            <Text className="text-xs font-medium text-colorFont">{data} </Text>
          </View>
        ))}
      </View>

      <View className="my-2">
        <Text className="text-base font-semibold text-emphasizedFont">{userData.name}</Text>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-xs font-medium text-disabledFont">내 라이프스타일과 일치율</Text>

        <Text
          className={`text-base font-medium ${
            userData.equality < 50 ? 'text-colorFont' : 'text-main1'
          }`}
        >
          {userData.equality}%
        </Text>
      </View>
    </Pressable>
  );
};

export default UserComponent;
