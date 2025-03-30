import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import ChatIcon from '@/assets/images/common/chat.svg';
import GrayArrow from '@/assets/images/common/grayArrow.svg';
import NotificationIcon from '@/assets/images/common/notification.svg';
import Background from '@/assets/images/cozyHome/background.svg';
import SchoolIcon from '@/assets/images/cozyHome/blueSchoolIcon.svg';
import Magnifier from '@/assets/images/cozyHome/magnifier.svg';
import TwoButtonModal from '@/components/common/twoButtonModal';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

interface HeaderComponentProps {
  handleLayout: (event: LayoutChangeEvent) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ handleLayout }) => {
  const router = useRouter();

  const { memberState } = useMemberStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { roomId } = useHasRoomStore();

  const [showNoLifeStyleCreateModal, setShowNoLifeStyleCreateModal] = useState<boolean>(false);
  const [showNoLifeStyleJoinModal, setShowNoLifeStyleJoinModal] = useState<boolean>(false);

  const handleCreateRoom = () => {
    if (!hasLifeStyle) {
      setShowNoLifeStyleCreateModal(true);
    } else {
      router.push('/room/createRoom');
    }
  };

  const handleJoinRoom = () => {
    if (!hasLifeStyle) {
      setShowNoLifeStyleJoinModal(true);
    } else {
      router.push('/room/joinRoom');
    }
  };

  return (
    <View
      className="gap-y-[12px] pt-[18px] pb-[25px] bg-subColor1 px-[20px] relative"
      onLayout={handleLayout}
    >
      <Background style={{ position: 'absolute' }} />
      <View className="flex flex-row justify-between items-center">
        <Pressable
          onPress={() => router.push('/onBoard/schoolAuthentication')}
          className="flex flex-row items-center gap-x-[6px]"
        >
          <SchoolIcon />
          <Text className="text-18 font-600 leading-18 text-mainColor">
            {memberState.universityName}
          </Text>
        </Pressable>

        <View className="flex flex-row justify-between items-center">
          <Pressable onPress={() => router.push('/chat/list')} className="p-[10px]">
            <ChatIcon />
          </Pressable>

          <Pressable onPress={() => router.push('/notification')} className="p-[10px]">
            <NotificationIcon />
          </Pressable>
        </View>
      </View>

      {!hasLifeStyle && (
        <Pressable
          onPress={() => router.push('/lifeStyle/onboarding')}
          className="bg-colorBox py-[12px] px-[16px] flex flex-row justify-between items-center rounded-xl"
        >
          <View className="gap-x-[8px] flex flex-row items-center">
            <Magnifier />
            <Text className="text-12 font-600 leading-12 text-basicFont">
              {memberState.nickname}님, 라이프스타일을 입력하고{'\n'}나와 꼭 맞는 룸메이트를
              찾아볼까요?
            </Text>
          </View>

          <GrayArrow />
        </Pressable>
      )}

      <View className="flex flex-row items-center gap-x-[11px] z-50">
        <Pressable
          disabled={roomId !== 0}
          onPress={handleCreateRoom}
          className="bg-colorBox p-[16px] rounded-xl flex-1 h-[80px]"
        >
          <Text
            className={`text-16 font-600 leading-16 ${roomId !== 0 ? 'text-disabledFont' : 'text-mainColor'}`}
          >
            방 만들기
          </Text>
        </Pressable>

        <TwoButtonModal
          isVisible={showNoLifeStyleCreateModal}
          title={`방을 만들려면\n라이프스타일을 입력해야해요!`}
          closeFunc={() => setShowNoLifeStyleCreateModal(false)}
          leftButtonText="안할래요"
          leftButtonFunc={() => setShowNoLifeStyleCreateModal(false)}
          rightButtonText="할래요"
          rightButtonFunc={() => router.push('/lifeStyle/onboarding')}
        />

        <Pressable
          disabled={roomId !== 0}
          onPress={handleJoinRoom}
          className="bg-colorBox p-[16px] rounded-xl flex-1 h-[80px]"
        >
          <Text
            className={`text-16 font-600 leading-16 ${roomId !== 0 ? 'text-disabledFont' : 'text-mainColor'}`}
          >
            방 참여하기
          </Text>
        </Pressable>

        <TwoButtonModal
          isVisible={showNoLifeStyleJoinModal}
          title={`방에 입장하려면\n라이프스타일을 입력해야해요!`}
          closeFunc={() => setShowNoLifeStyleJoinModal(false)}
          leftButtonText="안할래요"
          leftButtonFunc={() => setShowNoLifeStyleJoinModal(false)}
          rightButtonText="할래요"
          rightButtonFunc={() => router.push('/lifeStyle/onboarding')}
        />
      </View>
    </View>
  );
};

export default HeaderComponent;
