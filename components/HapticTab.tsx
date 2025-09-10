import { showRejectToast } from '@/utils/toast';
import { useHasRoomStore } from '@/zustand/room/room';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
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
  const { roomInfo } = useHasRoomStore();

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      onPress={(e) => {
        if (roomInfo.roomId === 0) {
          e.preventDefault();
          showRejectToast('방에 참여해야 사용할 수 있어요!');
        } else {
          props.onPress?.(e);
        }
      }}
    />
  );
}
