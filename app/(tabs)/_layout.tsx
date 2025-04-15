import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import CozyHomeNotSelected from '@/assets/images/bottomTab/cozyHomeNotSelected.svg';
import CozyHomeSelected from '@/assets/images/bottomTab/cozyHomeSelected.svg';
import FeedNotSelected from '@/assets/images/bottomTab/feedNotSelected.svg';
import FeedSelected from '@/assets/images/bottomTab/feedSelected.svg';
import MyPageNotSelected from '@/assets/images/bottomTab/myPageNotSelected.svg';
import MyPageSelected from '@/assets/images/bottomTab/myPageSelected.svg';
import RoleNRuleNotSelected from '@/assets/images/bottomTab/roleNRuleNotSelected.svg';
import RoleNRuleSelected from '@/assets/images/bottomTab/roleNRuleSelected.svg';
import RoomMateNotSelected from '@/assets/images/bottomTab/roomMateNotSelected.svg';
import RoomMateSelected from '@/assets/images/bottomTab/roomMateSelected.svg';
import { HapticTab } from '@/components/HapticTab';
import { showRejectToast } from '@/utils/toast';
import { useHasRoomStore } from '@/zustand/room/room';

export default function TabLayout() {
  const { roomInfo } = useHasRoomStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#68A4FF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            height: 94,
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#F1F1F1',
            shadowOpacity: 0,
            paddingHorizontal: 20,
            paddingTop: 4,
          },
          default: {
            height: 94,
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#F1F1F1',
            shadowOpacity: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-2 text-12 ${focused ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              코지홈
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View className="w-10 h-10 flex justify-center items-center mt-2">
              {focused ? <CozyHomeSelected /> : <CozyHomeNotSelected />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="roleNRule"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-2 text-12 ${focused ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              롤앤룰
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View className="w-10 h-10 flex justify-center items-center mt-2">
              {focused ? <RoleNRuleSelected /> : <RoleNRuleNotSelected />}
            </View>
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                if (roomInfo.roomId === 0) {
                  e.preventDefault();
                  showRejectToast('방에 참여해야 사용할 수 있어요!');
                } else {
                  props.onPress?.(e);
                }
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cozyBot"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-2 text-12 ${focused ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              코지봇
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View className="w-10 h-10 flex justify-center items-center mt-2">
              {focused ? <RoomMateSelected /> : <RoomMateNotSelected />}
            </View>
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                if (roomInfo.roomId === 0) {
                  e.preventDefault();
                  showRejectToast('방에 참여해야 사용할 수 있어요!');
                } else {
                  props.onPress?.(e);
                }
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-2 text-12 ${focused ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              피드
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            roomInfo.roomId !== 0 ? (
              <View className="w-10 h-10 flex justify-center items-center mt-2">
                {focused ? <FeedSelected /> : <FeedNotSelected />}
              </View>
            ) : (
              <Pressable
                onPress={() => showRejectToast('방에 참여해야 사용할 수 있어요!')}
                className="w-10 h-10 flex justify-center items-center mt-2"
              >
                {focused ? <FeedSelected /> : <FeedNotSelected />}
              </Pressable>
            ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-2 text-12 ${focused ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              마이페이지
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View className="w-10 h-10 flex justify-center items-center mt-2">
              {focused ? <MyPageSelected /> : <MyPageNotSelected />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
