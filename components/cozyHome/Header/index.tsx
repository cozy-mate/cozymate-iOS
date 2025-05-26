import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import ChatIcon from '@/assets/images/common/chat.svg';
import GrayArrow from '@/assets/images/common/grayArrow.svg';
import NotificationIcon from '@/assets/images/common/notification.svg';
import Background from '@/assets/images/cozyHome/background.svg';
import SchoolIcon from '@/assets/images/cozyHome/blueSchoolIcon.svg';
import Magnifier from '@/assets/images/cozyHome/magnifier.svg';
import TwoButtonModal from '@/components/common/twoButtonModal';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

interface HeaderComponentProps {
  handleLayout: (event: LayoutChangeEvent) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ handleLayout }) => {
  const width = Dimensions.get('screen').width;

  const router = useRouter();

  const { trackButton } = useTracker();

  const { memberState } = useMemberStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { roomInfo } = useHasRoomStore();

  const [showNoLifeStyleCreateModal, setShowNoLifeStyleCreateModal] = useState<boolean>(false);
  const [showNoLifeStyleJoinModal, setShowNoLifeStyleJoinModal] = useState<boolean>(false);

  const handleCreateRoom = () => {
    if (!hasLifeStyle) {
      setShowNoLifeStyleCreateModal(true);
    } else {
      trackButton(ButtonEvent.make_room, EventCategory.home_header, {
        category: 'home_header',
        button: 'make_room',
      });
      router.push('/room/createRoom');
    }
  };

  const handleJoinRoom = () => {
    if (!hasLifeStyle) {
      setShowNoLifeStyleJoinModal(true);
    } else {
      trackButton(ButtonEvent.join_room, EventCategory.home_header, {
        category: 'home_header',
        button: 'join_room',
      });
      router.push('/room/joinRoom');
    }
  };

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
      className="gap-y-[12px] pt-[18px] pb-[25px] bg-subColor1 px-[20px] relative"
      onLayout={handleLayout}
    >
      <Background style={{ position: 'absolute', top: -47 }} width={width} />
      <View className="flex flex-row justify-between items-center">
        <Pressable
          // onPress={() => router.push('/onBoard/chipSelect')}
          className="flex flex-row items-center gap-x-[6px]"
        >
          <SchoolIcon />
          <Text className="text-18 font-600 leading-18 text-mainColor">
            {memberState.universityName}
          </Text>
        </Pressable>

        <View className="flex flex-row justify-between items-center">
          <Pressable onPress={handleChat} className="p-[10px]">
            <ChatIcon />
          </Pressable>

          <Pressable onPress={handleNotice} className="p-[10px]">
            <NotificationIcon />
          </Pressable>
        </View>
      </View>

      {!hasLifeStyle && (
        <Pressable
          onPress={handleLifeStyle}
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

      <View className="flex flex-row items-center gap-x-[11px]">
        <Pressable
          disabled={roomInfo.roomId !== 0}
          onPress={handleCreateRoom}
          className="bg-colorBox p-[16px] rounded-xl flex-1 h-[80px]"
        >
          <Text
            className={`text-16 font-600 leading-16 ${roomInfo.roomId !== 0 ? 'text-disabledFont' : 'text-mainColor'}`}
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
          disabled={roomInfo.roomId !== 0}
          onPress={handleJoinRoom}
          className="bg-colorBox p-[16px] rounded-xl flex-1 h-[80px]"
        >
          <Text
            className={`text-16 font-600 leading-16 ${roomInfo.roomId !== 0 ? 'text-disabledFont' : 'text-mainColor'}`}
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
