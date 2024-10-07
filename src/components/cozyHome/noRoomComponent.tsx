import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MyRoomComponentProps {
  roomData: {
    title: string;
    hashTag: string[];
    currentNum: number;
    equality: number;
  };
}

const NoRoomComponent: React.FC = () => {
  return (
    <View className="rounded-xl border-[1px] border-[#CDCDCD]">
      <LinearGradient
        colors={['#F1F1F1', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.25 }}
        className="flex flex-col items-center p-4 rounded-xl"
      >
        <Text className="pt-2 text-sm font-medium text-disabledFont">
          아직 참여하고 있는 방이 없어요
        </Text>
        <Pressable>
          <Text className="p-2 text-base font-semibold text-main1">방 둘러보러 가기 {'>'}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default NoRoomComponent;
