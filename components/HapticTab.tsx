import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

export function RoleNRuleHapticTab(props: BottomTabBarButtonProps) {
  const { hasRoom } = useMemberStore();

  return (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      onPress={(e) => {
        if (!hasRoom) {
          e.preventDefault();
          showRejectToast('방에 참여해야 사용할 수 있어요!');
        } else {
          props.onPress?.(e);
        }
      }}
    />
  );
}
