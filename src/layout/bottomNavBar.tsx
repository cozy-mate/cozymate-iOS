import React from 'react';
import { Text, View } from 'react-native';

import SelectedIcon from '@assets/selectBottomTabIcon.svg';
import NotSelectedIcon from '@assets/bottomTabIcon.svg';

interface TabComponentProps {
  focused: boolean;
}

export const CozyHome: React.FC<TabComponentProps> = ({ focused }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <SelectedIcon /> : <NotSelectedIcon />}
      <Text className="text-[10px] font-medium text-basicFont mt-[6px]">코지홈</Text>
    </View>
  );
};

export const RoleNRule: React.FC<TabComponentProps> = ({ focused }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <SelectedIcon /> : <NotSelectedIcon />}
      <Text className="text-[10px] font-medium text-basicFont mt-[6px]">롤앤룰</Text>
    </View>
  );
};

export const Feed: React.FC<TabComponentProps> = ({ focused }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <SelectedIcon /> : <NotSelectedIcon />}
      <Text className="text-[10px] font-medium text-basicFont mt-[6px]">피드</Text>
    </View>
  );
};

export const RoomMate: React.FC<TabComponentProps> = ({ focused }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <SelectedIcon /> : <NotSelectedIcon />}
      <Text className="text-[10px] font-medium text-basicFont mt-[6px]">룸메</Text>
    </View>
  );
};

export const MyPage: React.FC<TabComponentProps> = ({ focused }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <SelectedIcon /> : <NotSelectedIcon />}
      <Text className="text-[10px] font-medium text-basicFont mt-[6px]">마이페이지</Text>
    </View>
  );
};
