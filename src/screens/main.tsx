import React from 'react';
import { useRecoilValue } from 'recoil';
import { TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feed, MyPage, CozyBot, CozyHome, RoleNRule } from 'src/layout/bottomNavBar';

import MyPageScreen from './myPage/myPage';
import FeedMainScreen from './feed/feedMain';
import RoomMainScreen from './roomMain/roomMain';
import CozyHomeScreen from './cozyHome/cozyHome';
import TodoListScreen from './todoList/todoList';

import { hasRoomState } from '@recoil/recoil';

import { useIsOldiPhone } from '@hooks/device';

import { TabNavigatorParamList } from '@type/param/stack';

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const DisabledTabButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPress={() => {}}
    />
  );
};

const MainScreen = () => {
  const hasRoom = useRecoilValue(hasRoomState);

  const isOldiPhone = useIsOldiPhone();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: isOldiPhone
          ? {
              backgroundColor: '#FFFFFF',
              height: 60,
              paddingTop: 8,
              paddingBottom: 16,
              borderTopWidth: 0,
              borderRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              position: 'absolute',
              shadowColor: 'rgba(160,160,160, 0.25)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
            }
          : {
              backgroundColor: '#FFFFFF',
              height: 94,
              paddingTop: 12,
              paddingBottom: 40,
              borderTopWidth: 0,
              borderRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              position: 'absolute',
              shadowColor: 'rgba(160,160,160, 0.25)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
            },
      }}
    >
      <Tab.Screen
        name="CozyHomeScreen"
        component={CozyHomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <CozyHome focused={focused} isOldIphone={isOldiPhone} />,
        }}
      />
      {hasRoom.hasRoom ? (
        <Tab.Screen
          name="TodoListScreen"
          component={TodoListScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <RoleNRule focused={focused} isOldIphone={isOldiPhone} />;
            },
          })}
        />
      ) : (
        <Tab.Screen
          name="TodoListScreen"
          component={TodoListScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <RoleNRule focused={focused} isOldIphone={isOldiPhone} />;
            },
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          })}
        />
      )}
      {hasRoom.hasRoom ? (
        <Tab.Screen
          name="RoomMainScreen"
          component={RoomMainScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <CozyBot focused={focused} isOldIphone={isOldiPhone} />;
            },
          })}
        />
      ) : (
        <Tab.Screen
          name="RoomMainScreen"
          component={RoomMainScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <CozyBot focused={focused} isOldIphone={isOldiPhone} />;
            },
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          })}
        />
      )}

      {hasRoom.hasRoom ? (
        <Tab.Screen
          name="FeedMainScreen"
          component={FeedMainScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <Feed focused={focused} isOldIphone={isOldiPhone} />;
            },
          })}
        />
      ) : (
        <Tab.Screen
          name="FeedMainScreen"
          component={FeedMainScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <Feed focused={focused} isOldIphone={isOldiPhone} />;
            },
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          })}
        />
      )}

      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MyPage focused={focused} isOldIphone={isOldiPhone} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
