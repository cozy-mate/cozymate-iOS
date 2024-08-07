import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '@type/param/loginStack';

import { CozyHome, RoleNRule, Feed, RoomMate, MyPage } from 'src/layout/bottomNavBar';

import CozyHomeScreen from './cozyHome/cozyHome';
import RoomMateScreen from './roomMate/roomMate';
import TodoListScreen from './todoList/todoList';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

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
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="CozyHomeScreen"
        component={CozyHomeScreen}
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
      {/* <Tab.Screen
        name="CozyHomeScreen"
        component={CozyHomeScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <Feed />;
          },
        })}
      /> */}
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
      {/* <Tab.Screen
        name="MyPageScreen"
        component={CozyHomeScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MyPage />;
          },
        })}
      /> */}
    </Tab.Navigator>
  );
};

export default MainScreen;
