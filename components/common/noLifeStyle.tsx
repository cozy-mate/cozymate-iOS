import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import StarImage from '@/assets/images/roomMate/star.svg';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

const NoLifeStyleComponent: React.FC = () => {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { memberInfo } = useMemberStore();

  const onPressLifeStyle = () => {
    trackButton(ButtonEvent.life_style_component, EventCategory.content_mate);
    router.push('/lifeStyle/onboarding');
  };

  return (
    <View className="pt-[32px] pb-[16px] flex items-center mt-[16px]">
      <StarImage />
      <View className="p-[16px] flex items-center">
        <View>
          <Text className="Medium12 text-disabledFont text-center">
            {memberInfo?.nickname}님, 라이프스타일을 입력하면
          </Text>
          <Text className="Medium12 text-disabledFont text-center">
            나와 똑같은 답변을 한 사용자를 확인할 수 있어요!
          </Text>
        </View>
        <Pressable
          onPress={onPressLifeStyle}
          className="p-[8px] flex flex-row items-center gap-x-[8px]"
        >
          <Text className="Semibold16 text-mainColor text-center">라이프스타일 입력하러가기</Text>
          <BlueRightArrowIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default NoLifeStyleComponent;
