import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginTabNavigatorParamList } from '@type/param/loginStack';

import { CozyHome, RoleNRule, Feed, RoomMate, MyPage } from 'src/layout/bottomNavBar';

import CozyHomeScreen from './cozyHome/cozyHome';
import TodoListScreen from './todoList/todoList';
import FeedMainScreen from './feed/feedMain';
import RoomMateScreen from './roomMate/roomMate';
import MyPageScreen from './myPage/myPage';

const Tab = createBottomTabNavigator<LoginTabNavigatorParamList>();

const DisabledTabButton: React.FC<TouchableOpacityProps> = (props) => {
  return <TouchableOpacity {...props} onPress={() => {}} />;
};

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
        name="CozyHomeScreen"
        component={CozyHomeScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <CozyHome focused={focused} />,
        })}
      />
      <Tab.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <RoleNRule focused={focused} />,
          tabBarButton: (props) => <DisabledTabButton {...props} />,
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
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Feed focused={focused} />,
          tabBarButton: (props) => <DisabledTabButton {...props} />,
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
