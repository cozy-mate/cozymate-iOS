import { useRouter } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';

import ChatIcon from '@/assets/images/common/chat.svg';
import GrayArrow from '@/assets/images/common/grayArrow.svg';
import NotificationIcon from '@/assets/images/common/notification.svg';
import Background from '@/assets/images/cozyHome/background.svg';
import SchoolIcon from '@/assets/images/cozyHome/blueSchoolIcon.svg';
import Magnifier from '@/assets/images/cozyHome/magnifier.svg';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

import OpacityPressable from '../opacityPressable';

export default function HeaderComponent() {
  const router = useRouter();

  const { memberInfo, hasLifeStyle } = useMemberStore();
  const { trackButton } = useTracker();

  const handleChat = () => {
    trackButton(ButtonEvent.chat, EventCategory.home_header);
    router.push('/chat/list');
  };

  const handleNotice = () => {
    trackButton(ButtonEvent.notice, EventCategory.home_header);
    router.push('/notification');
  };

  const handleLifeStyle = () => {
    trackButton(ButtonEvent.life_style, EventCategory.home_header);
    router.push('/lifeStyle/onboarding');
  };

  return (
    <View
      className={`${hasLifeStyle ? 'h-[201px]' : 'h-[127px]'} pt-[65px] gap-y-[12px] px-[20px] bg-subColor1 relative`}
    >
      <Background
        style={{ position: 'absolute', top: 0 }}
        width={Dimensions.get('screen').width}
        height={hasLifeStyle ? 201 : 127}
        preserveAspectRatio="xMidYMid slice"
      />
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-[6px]">
          <SchoolIcon />
          <Text className="Semibold18 text-mainColor">{memberInfo?.universityName ?? ''}</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <OpacityPressable onPress={handleChat}>
            <View className="p-[10px]">
              <ChatIcon />
            </View>
          </OpacityPressable>

          <OpacityPressable onPress={handleNotice}>
            <View className="p-[10px]">
              <NotificationIcon />
            </View>
          </OpacityPressable>
        </View>
      </View>

      {hasLifeStyle && (
        <OpacityPressable onPress={handleLifeStyle}>
          <View className="bg-colorBox py-[12px] px-[16px] flex flex-row justify-between items-center rounded-xl">
            <View className="gap-x-[8px] flex flex-row items-center">
              <Magnifier />
              <Text className="Semibold12 text-basicFont">
                {memberInfo?.nickname ?? ''}님, 라이프스타일을 입력하고{'\n'}나와 꼭 맞는 룸메이트를
                찾아볼까요?
              </Text>
            </View>

            <GrayArrow />
          </View>
        </OpacityPressable>
      )}
    </View>
  );
}
