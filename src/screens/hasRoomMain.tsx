import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HasRoomTabNavigatorParamList } from '@type/param/roomStack';

import { CozyHome, RoleNRule, Feed, RoomMate, MyPage } from 'src/layout/bottomNavBar';

import RoomMainScreen from './roomMain/roomMain';
import TodoListScreen from './todoList/todoList';
import RoomMateScreen from './roomMate/roomMate';
import FeedMainScreen from './feed/feedMain';
import MyPageScreen from './myPage/myPage';

const Tab = createBottomTabNavigator<HasRoomTabNavigatorParamList>();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          paddingTop: 12,
          paddingBottom: 32,
          borderTopWidth: 1,
          borderTopColor: '#F1F1F1',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="RoomMainScreen"
        component={RoomMainScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <CozyHome focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <RoleNRule focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="RoomMateScreen"
        component={RoomMateScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <RoomMate focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="FeedMainScreen"
        component={FeedMainScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <Feed focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MyPage focused={focused} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
