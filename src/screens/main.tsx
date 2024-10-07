import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '@type/param/stack';

import { CozyHome, RoleNRule, Feed, RoomMate, MyPage } from 'src/layout/bottomNavBar';

import RoomMainScreen from './roomMain/roomMain';
import CozyHomeScreen from './cozyHome/cozyHome';
import TodoListScreen from './todoList/todoList';
import RoomMateScreen from './roomMate/roomMate';
import FeedMainScreen from './feed/feedMain';
import MyPageScreen from './myPage/myPage';
import { useRecoilValue } from 'recoil';
import { hasRoomState, MyLifeStyleState } from '@recoil/recoil';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';
import LifeStyleOnboardingScreen from './lifeStyle/onBoarding';
import { useIsOldiPhone } from '@hooks/device';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const DisabledTabButton: React.FC<TouchableOpacityProps> = (props) => {
  return <TouchableOpacity {...props} onPress={() => {}} />;
};

const MainScreen = () => {
  const hasRoom = useRecoilValue(hasRoomState);
  const myLifeStyleData = useRecoilValue(MyLifeStyleState);

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
              paddingTop: 12,
              paddingBottom: 32,
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
      {!hasRoom.hasRoom ? (
        <Tab.Screen
          name="RoomMainScreen"
          component={RoomMainScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <CozyHome focused={focused} isOldIphone={isOldiPhone} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="CozyHomeScreen"
          component={CozyHomeScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <CozyHome focused={focused} isOldIphone={isOldiPhone} />,
          }}
        />
      )}
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
      {myLifeStyleData.acceptance === '' ? (
        <Tab.Screen
          name="RoomMateScreen"
          component={RoomMateScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <RoomMate focused={focused} isOldIphone={isOldiPhone} />;
            },
          })}
        />
      ) : (
        <Tab.Screen
          name="LifeStyleOnboardingScreen"
          component={LifeStyleOnboardingScreen}
          options={({ route }) => ({
            // title 없애고 custom 하기 위한 옵션
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return <RoomMate focused={focused} isOldIphone={isOldiPhone} />;
            },
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
