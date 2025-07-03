import { ErrorBoundaryProps, useLocalSearchParams, useRouter } from 'expo-router';
import { Suspense, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/common/background.svg';
import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import ErrorImage from '@/assets/images/error.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import LoadingComponent from '@/components/common/loading';
import OverScrollView from '@/components/common/overScrollView';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import BottomButtonContainer from '@/components/roomDetail/bottomButtonContainer';
import DormitoryInfoComponent from '@/components/roomDetail/dormitoryInfo';
import MateLifeStyleComponent from '@/components/roomDetail/mateLifeStyle';
import MateListComponent from '@/components/roomDetail/mateList';
import RoomInfoComponent from '@/components/roomDetail/roomInfo';
import { useExitRoom, useGetRoomDetail } from '@/hooks/room/room';
import { useAcceptRoomInvite, useCancelRequestRoom, useSendRoomRequest } from '@/hooks/room/user';
import { useCreateRoomLike, useDeleteRoomLike } from '@/hooks/room-favorite/room-favorite';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <Text className="Semibold20 text-emphasizedFont mt-[56px] mb-[100px]">
          잘못된 요청입니다.
        </Text>
        <ErrorImage />
      </View>

      <BottomButtonComponent
        buttonText="뒤로 가기"
        onPress={() => router.back()}
        color="BLUE"
        disabled={false}
      />
    </SafeAreaView>
  );
}

function RoomDetailComponent() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { trackButton } = useTracker();

  const { data } = useGetRoomDetail(Number(id));

  const { mutateAsync: deleteLike } = useDeleteRoomLike(data.result.favoriteId, data.result.roomId);
  const { mutateAsync: createLike } = useCreateRoomLike(data.result.roomId);

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);

  const { mutateAsync: sendRequest } = useSendRoomRequest(
    Number(id),
    data.result.managerNickname,
    setIsLifeStyleModalOpen,
  );
  const { mutateAsync: cancelRequest } = useCancelRequestRoom(Number(id));
  const { mutateAsync: acceptRoomInvite } = useAcceptRoomInvite(
    Number(id),
    data.result.managerNickname,
  );

  const { mutateAsync: exitRoom } = useExitRoom(Number(id));
  const [isExitRoomModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  const onPress = (type: 'CHAT' | 'LIKE' | 'EXIT' | 'ACCEPT' | 'REJECT' | 'SEND' | 'CANCEL') => {
    trackButton(ButtonEvent.room_message, EventCategory.content_room, {
      roomId: Number(id),
    });

    switch (type) {
      case 'CHAT':
        router.push(
          `/chat/send/${Number(data.result.managerMemberId)}?nickname=${encodeURIComponent(data.result.managerNickname)}`,
        );
        break;

      case 'LIKE':
        if (data.result.favoriteId !== 0) {
          deleteLike();
        } else {
          createLike();
        }
        break;

      case 'EXIT':
        setIsExitModalOpen(true);
        break;

      case 'ACCEPT':
        acceptRoomInvite(true);
        break;

      case 'REJECT':
        acceptRoomInvite(false);
        break;

      case 'SEND':
        sendRequest();
        break;

      case 'CANCEL':
        cancelRequest();
        break;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="bg-subColor1">
      <View className="px-[20px] pb-[8px]">
        <BackHeaderComponent>
          <View className="flex flex-row items-center gap-x-[4px]">
            {!data.result.isRoomManager && (
              <Pressable
                onPress={() => onPress('CHAT')}
                className="flex items-center justify-center w-[40px] h-[40px]"
              >
                <ChatIcon />
              </Pressable>
            )}

            {data.result.favoriteId !== 0 ? (
              <Pressable
                onPress={() => onPress('LIKE')}
                className="flex items-center justify-center w-[40px] h-[40px]"
              >
                <FilledHeartIcon />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => onPress('LIKE')}
                className="flex items-center justify-center w-[40px] h-[40px]"
              >
                <HeartIcon />
              </Pressable>
            )}
          </View>
        </BackHeaderComponent>
      </View>

      <ScrollView contentContainerStyle={{ marginTop: 8, rowGap: 20, paddingBottom: 120 }}>
        <Background style={{ position: 'absolute' }} />
        <RoomInfoComponent data={data.result} />

        <View className="bg-white gap-y-[56px] rounded-t-[20px] pt-[32px] pb-[120px]">
          <MateListComponent data={data.result} />
          <DormitoryInfoComponent data={data.result} />
          <MateLifeStyleComponent data={data.result} />
        </View>

        {/* 하단 over-scroll 시의 흰색 배경 설정 */}
        <OverScrollView backgroundColor="#FFFFFF" height={300} bottom={-100} />
      </ScrollView>

      <BottomButtonContainer id={Number(id)} onPress={onPress} />

      <TwoButtonModal
        isVisible={isLifeStyleModalOpen}
        title={`방에 참여하려면 라이프스타일을 입력해야해요,\n라이프스타일을 입력하시겠어요?`}
        closeFunc={() => setIsLifeStyleModalOpen(false)}
        leftButtonText="아니오"
        leftButtonFunc={() => setIsLifeStyleModalOpen(false)}
        rightButtonText="예"
        rightButtonFunc={() => {
          setIsLifeStyleModalOpen(false);
          router.push('/lifeStyle/onboarding');
        }}
      />

      <TwoButtonModal
        isVisible={isExitRoomModalOpen}
        title="방을 나가시겠습니까?"
        closeFunc={() => setIsExitModalOpen(false)}
        leftButtonText="취소"
        leftButtonFunc={() => setIsExitModalOpen(false)}
        rightButtonText="나가기"
        rightButtonFunc={exitRoom}
      />
    </SafeAreaView>
  );
}

export default function RoomDetail() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <RoomDetailComponent />
    </Suspense>
  );
}
