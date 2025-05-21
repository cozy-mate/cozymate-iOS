import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/common/background.svg';
import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import TwoButtonModal from '@/components/common/twoButtonModal';
import DormitoryInfoComponent from '@/components/roomDetail/dormitoryInfo';
import MateLifeStyleComponent from '@/components/roomDetail/mateLifeStyle';
import MateListComponent from '@/components/roomDetail/mateList';
import RoomInfoComponent from '@/components/roomDetail/roomInfo';
import {
  useAcceptRoomInvite,
  useCancelRequestRoom,
  useCheckIsInvitedRoom,
  useCheckIsRequestedRoom,
  useExitRoom,
  useGetRoomDetail,
  useSendRoomRequest,
} from '@/hooks/room/room';
import { useCreateRoomLike, useDeleteRoomLike } from '@/hooks/room-favorite/room-favorite';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import TwoBottomButtonComponent from '@/newComponents/common/twoBottomButton';
import { useHasRoomStore } from '@/zustand/room/room';

export default function RoomDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { roomInfo } = useHasRoomStore();

  const { data, refetch } = useGetRoomDetail(Number(id));
  const { data: isRequested } = useCheckIsRequestedRoom(Number(id));
  const { data: isInvited } = useCheckIsInvitedRoom(Number(id));

  const { mutateAsync: deleteLike } = useDeleteRoomLike(data.result.favoriteId, refetch);
  const { mutateAsync: createLike } = useCreateRoomLike(data.result.roomId, refetch);

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);

  const { mutateAsync: sendRequest } = useSendRoomRequest(
    Number(id),
    data.result.name,
    setIsLifeStyleModalOpen,
  );
  const { mutateAsync: cancelRequest } = useCancelRequestRoom(Number(id));
  const { mutateAsync: acceptRoomInvite } = useAcceptRoomInvite(Number(id));

  const { mutateAsync: exitRoom } = useExitRoom(Number(id));
  const [isExitRoomModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <SafeAreaView edges={['top']} className="bg-subColor1">
        <View className="px-[20px]">
          <BackHeaderComponent>
            <View className="flex flex-row items-center gap-x-[4px]">
              <Pressable
                onPress={() =>
                  router.push(
                    `/chat/send/${Number(data.result.managerMemberId)}?nickname=${encodeURIComponent(data.result.managerNickname)}`,
                  )
                }
                className="pl-[14px] pr-[8px] py-[11px]"
              >
                <ChatIcon />
              </Pressable>
              {data.result.favoriteId !== 0 ? (
                <Pressable onPress={() => deleteLike()} className="p-[8px]">
                  <FilledHeartIcon />
                </Pressable>
              ) : (
                <Pressable onPress={() => createLike()} className="p-[8px]">
                  <HeartIcon />
                </Pressable>
              )}
            </View>
          </BackHeaderComponent>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, rowGap: 20, paddingBottom: 120 }}
          stickyHeaderIndices={[2]}
        >
          <Background style={{ position: 'absolute' }} />
          <RoomInfoComponent data={data.result} />

          <View className="bg-white gap-y-[56px] rounded-t-[20px] pt-[32px]">
            <ScrollView contentContainerStyle={{ rowGap: 56, flex: 1 }}>
              <MateListComponent data={data.result} />
              <DormitoryInfoComponent data={data.result} />
              <MateLifeStyleComponent data={data.result} />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView edges={['bottom']} className="bg-white" />

      {roomInfo.roomId === data.result.roomId && (
        <BottomButtonComponent
          buttonText="방 나가기"
          onPress={() => setIsExitModalOpen(true)}
          color="RED"
          disabled={false}
        />
      )}

      {roomInfo.roomId !== data.result.roomId && !isRequested.result && !isInvited.result && (
        <BottomButtonComponent
          buttonText="방 참여하기"
          disabled={false}
          color="BLUE"
          onPress={() => sendRequest()}
        />
      )}

      {roomInfo.roomId !== data.result.roomId && isRequested.result && (
        <BottomButtonComponent
          buttonText="방 참여 취소하기"
          onPress={() => cancelRequest()}
          color="WHITE"
          disabled={false}
        />
      )}

      {roomInfo.roomId !== data.result.roomId && isInvited.result && (
        <TwoBottomButtonComponent
          onLeftPress={() => acceptRoomInvite(false)}
          onRightPress={() => acceptRoomInvite(true)}
          disabled={false}
        />
      )}

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
        rightButtonFunc={() => {
          setIsExitModalOpen(false);
          exitRoom();
        }}
      />
    </Fragment>
  );
}
