import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MyRoomComponentProps {
  toRoom: () => void;
  roomData: {
    title: string;
    hashTag: string[];
    currentNum: number;
    equality: number;
  };
}

const MyRoomComponent: React.FC<MyRoomComponentProps> = ({ toRoom, roomData }) => {
  const [hasTagLen, setHashTagLen] = useState<number>(0);

  return (
    <Pressable className="rounded-xl border border-main1" onPress={toRoom}>
      <LinearGradient
        colors={['rgba(249, 251, 255, 0.8)', 'rgba(223, 236, 255, 0.8)']}
        start={{ x: 0.008, y: 0 }}
        end={{ x: 1.044, y: 1 }}
        className="rounded-xl p-4"
      >
        <View className="flex flex-row">
          {roomData.hashTag.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-white px-2 py-[2px]">
              <Text className="text-xs font-medium text-colorFont">#{hash} </Text>
            </View>
          ))}
        </View>

        <View className="my-2">
          <Text className="text-base font-semibold text-emphasizedFont">{roomData.title}</Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs font-medium text-disabledFont">
            <Text className="text-main1">{roomData.currentNum}명</Text>의 룸메이트가 있어요
          </Text>

          <Text className="text-base font-medium text-colorFont">{roomData.equality}%</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default MyRoomComponent;
