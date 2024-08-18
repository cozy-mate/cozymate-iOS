import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HasRoomTabNavigatorParamList } from '@type/param/roomStack';

import { CozyHome, RoleNRule, Feed, RoomMate, MyPage } from 'src/layout/bottomNavBar';

// import CozyHomeScreen from './cozyHome/cozyHome';
import TodoListScreen from './todoList/todoList';
import FeedMainScreen from './feed/feedMain';
import RoomMateScreen from './roomMate/roomMate';
import MyPageScreen from './myPage/myPage';
import RoomMainScreen from './roomMain/roomMain';
// import { useRecoilState } from 'recoil';
// import { hasRoomState } from '@recoil/recoil';

const Tab = createBottomTabNavigator<HasRoomTabNavigatorParamList>();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          paddingTop: 16,
          paddingBottom: 32,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: 'rgb(160, 160, 160)',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          borderTopColor: 'white',
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
