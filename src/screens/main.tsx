import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { MyPage, CozyBot, CozyHome, RoleNRule } from 'src/layout/bottomNavBar';

import MyPageScreen from './myPage/myPage';
import RoomMainScreen from './roomMain/roomMain';
import CozyHomeScreen from './cozyHome/cozyHome';
import RoleNRuleScreen from './roleNrule/roleNrule';

import { useHasRoomStore } from '@zustand/room/room';

import { useInitFcm } from '@hooks/fcm';
import { useIsOldiPhone } from '@hooks/device';

import { showRejectToast } from '@utils/toast';

import { TabNavigatorParamList } from '@type/param/stack';
import { sendNavBarEvent } from '@utils/ga/sendButtonEvent';

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
      onPress={() => {
        showRejectToast('방에 참여해야 사용할 수 있어요!');
        ReactNativeHapticFeedback.trigger('impactLight', options);
      }}
    />
  );
};

const HapticTabButton: React.FC<TouchableOpacityProps & { screenName: string }> = (props) => {
  const scale = useSharedValue(1);

  const { screenName } = props;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  return (
    <TouchableOpacity
      {...props}
      onPress={(event: GestureResponderEvent) => {
        ReactNativeHapticFeedback.trigger('impactLight', options);
        sendNavBarEvent(screenName);
        scale.value = withTiming(1.05, { duration: 150, easing: Easing.ease }, () => {
          scale.value = withTiming(1, { duration: 150 });
        });

        props.onPress?.(event);
      }}
    >
      <Animated.View style={animatedStyle}>{props.children}</Animated.View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const { myRoom } = useHasRoomStore();

  const isOldiPhone = useIsOldiPhone();

  useInitFcm();

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
          tabBarButton: (props) => <HapticTabButton {...props} screenName="CozyHomeScreen" />,
        }}
      />
      {myRoom.hasRoom ? (
        <Tab.Screen
          name="RoleNRuleScreen"
          component={RoleNRuleScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <RoleNRule focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <HapticTabButton {...props} screenName="RoleNRuleScreen" />,
          }}
        />
      ) : (
        <Tab.Screen
          name="RoleNRuleScreen"
          component={RoleNRuleScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <RoleNRule focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          }}
        />
      )}
      {myRoom.hasRoom ? (
        <Tab.Screen
          name="RoomMainScreen"
          component={RoomMainScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <CozyBot focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <HapticTabButton {...props} screenName="RoomMainScreen" />,
          }}
        />
      ) : (
        <Tab.Screen
          name="RoomMainScreen"
          component={RoomMainScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <CozyBot focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          }}
        />
      )}

      {/* {myRoom.hasRoom ? (
        <Tab.Screen
          name="FeedMainScreen"
          component={FeedMainScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <Feed focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <HapticTabButton {...props} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="FeedMainScreen"
          component={FeedMainScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <Feed focused={focused} isOldIphone={isOldiPhone} />,
            tabBarButton: (props) => <DisabledTabButton {...props} />,
          }}
        />
      )} */}

      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <MyPage focused={focused} isOldIphone={isOldiPhone} />,
          tabBarButton: (props) => <HapticTabButton {...props} screenName="MyPageScreen" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
