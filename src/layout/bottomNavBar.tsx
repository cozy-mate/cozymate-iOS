import React from 'react';
import { Text, View } from 'react-native';

import FeedSelected from '@assets/main/feedSelected.svg';
import MyPageSelected from '@assets/main/myPageSelected.svg';
import FeedNotSelected from '@assets/main/feedNotSelected.svg';
import CozyHomeSelected from '@assets/main/cozyHomeSelected.svg';
import RoomMateSelected from '@assets/main/roomMateSelected.svg';
import RoleNRuleSelected from '@assets/main/roleNRuleSelected.svg';
import MyPageNotSelected from '@assets/main/myPageNotSelected.svg';
import CozyHomeNotSelected from '@assets/main/cozyHomeNotSelected.svg';
import RoomMateNotSelected from '@assets/main/roomMateNotSelected.svg';
import RoleNRuleNotSelected from '@assets/main/roleNRuleNotSelected.svg';

interface TabComponentProps {
  focused: boolean;
  isOldIphone: boolean;
}

export const CozyHome: React.FC<TabComponentProps> = ({ focused, isOldIphone }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <CozyHomeSelected /> : <CozyHomeNotSelected />}
      <Text
        className={`${isOldIphone ? 'text-[10px]' : 'text-xs'} ${
          focused ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
        }`}
      >
        코지홈
      </Text>
    </View>
  );
};

export const RoleNRule: React.FC<TabComponentProps> = ({ focused, isOldIphone }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <RoleNRuleSelected /> : <RoleNRuleNotSelected />}
      <Text
        className={`${isOldIphone ? 'text-[10px]' : 'text-xs'} ${
          focused ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
        }`}
      >
        롤앤룰
      </Text>
    </View>
  );
};

export const RoomMate: React.FC<TabComponentProps> = ({ focused, isOldIphone }) => {
  return (
    <View className="relative flex flex-col items-center justify-center">
      {focused ? <RoomMateSelected /> : <RoomMateNotSelected />}
      <Text
        className={`${isOldIphone ? 'text-[10px]' : 'text-xs'} ${
          focused ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
        }`}
      >
        룸메이트
      </Text>
    </View>
  );
};

export const Feed: React.FC<TabComponentProps> = ({ focused, isOldIphone }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <FeedSelected /> : <FeedNotSelected />}
      <Text
        className={`${isOldIphone ? 'text-[10px]' : 'text-xs'} ${
          focused ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
        }`}
      >
        피드
      </Text>
    </View>
  );
};

export const MyPage: React.FC<TabComponentProps> = ({ focused, isOldIphone }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      {focused ? <MyPageSelected /> : <MyPageNotSelected />}
      <Text
        className={`${isOldIphone ? 'text-[10px]' : 'text-xs'} ${
          focused ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
        }`}
      >
        마이페이지
      </Text>
    </View>
  );
};
