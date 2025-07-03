import { ErrorBoundaryProps, useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, Suspense, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import ErrorImage from '@/assets/images/error.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import LoadingComponent from '@/components/common/loading';
import OverScrollView from '@/components/common/overScrollView';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import AdditionalInfoComponent from '@/components/userDetail/additionalInfo';
import BasicInfoComponent from '@/components/userDetail/basicInfo';
import BottomButtonContainer from '@/components/userDetail/bottomButtonContainer';
import DormitoryInfoComponent from '@/components/userDetail/dormitoryInfo';
import EssentialInfoComponent from '@/components/userDetail/essentialInfo';
import MemberInfoComponent from '@/components/userDetail/memberInfo';
import TableInfoComponent from '@/components/userDetail/tableInfo';
import ViewTypeButtonComponent from '@/components/userDetail/viewTypeButton';
import { useCreateMemberLike, useDeleteMemberLike } from '@/hooks/member-favorite/member-favorite';
import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';
import {
  useAcceptRoomRequest,
  useCancelInviteMember,
  useInviteMember,
} from '@/hooks/room/roomManager';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/member/member';
import { useHasRoomStore } from '@/zustand/room/room';

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

function UserDetailComponent() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { memberState } = useMemberStore();
  const { roomInfo } = useHasRoomStore();

  const { trackButton } = useTracker();

  const { data } = useGetMemberDetail(Number(id));

  const [type, setType] = useState<'LIST' | 'TABLE'>('LIST');

  const { mutateAsync: deleteLike } = useDeleteMemberLike(data.result.favoriteId, Number(id));
  const { mutateAsync: createLike } = useCreateMemberLike(data.result.memberDetail.memberId);

  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);

  const { mutateAsync: inviteMember } = useInviteMember(
    Number(id),
    data.result.memberDetail.nickname,
    setIsCreateRoomModalOpen,
    data.result.roomId,
  );
  const { mutateAsync: cancelInvite } = useCancelInviteMember(Number(id));
  const { mutateAsync: acceptRoomRequest } = useAcceptRoomRequest(
    Number(id),
    data.result.memberDetail.nickname,
    roomInfo.roomId,
  );

  const onPress = (
    type: 'CHAT' | 'LIKE' | 'VIEW' | 'INVITE' | 'CANCEL' | 'ACCEPT' | 'REJECT',
    viewType?: 'LIST' | 'TABLE',
  ) => {
    if (type === 'VIEW') {
      trackButton(
        viewType === 'LIST' ? ButtonEvent.show_list : ButtonEvent.show_grid,
        EventCategory.mate_detail,
        { viewType },
      );
      setType(viewType as 'LIST' | 'TABLE');
      return;
    }

    trackButton(ButtonEvent.invite_room, EventCategory.mate_detail);

    switch (type) {
      case 'CHAT':
        router.push(
          `/chat/send/${Number(id)}?nickname=${encodeURIComponent(data.result.memberDetail.nickname)}`,
        );
        break;

      case 'LIKE':
        if (data.result.favoriteId !== 0) {
          deleteLike();
        } else {
          createLike();
        }
        break;

      case 'INVITE':
        inviteMember();
        break;

      case 'CANCEL':
        cancelInvite();
        break;

      case 'ACCEPT':
        acceptRoomRequest(true);
        break;

      case 'REJECT':
        acceptRoomRequest(false);
        break;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="bg-subColor1">
      <View className="px-[20px] pb-[8px]">
        <BackHeaderComponent>
          {Number(id) !== memberState.memberId && (
            <View className="flex flex-row items-center gap-x-[4px]">
              <Pressable
                onPress={() => onPress('CHAT')}
                className="flex items-center justify-center w-[40px] h-[40px]"
              >
                <ChatIcon />
              </Pressable>
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
          )}
        </BackHeaderComponent>
      </View>

      <ScrollView contentContainerStyle={{ marginTop: 8, rowGap: 20, paddingBottom: 160 }}>
        <MemberInfoComponent id={Number(id)} data={data.result} />

        <View className="bg-white flex-1 gap-y-[16px] pt-[12px] rounded-t-[20px] pb-[68px]">
          <ViewTypeButtonComponent currentType={type} onPress={onPress} />
          <View className="gap-y-[56px]">
            {type === 'LIST' ? (
              <Fragment>
                <BasicInfoComponent data={data.result} />
                <DormitoryInfoComponent data={data.result} />
                <EssentialInfoComponent data={data.result} />
              </Fragment>
            ) : (
              <TableInfoComponent data={data.result} />
            )}
            <AdditionalInfoComponent data={data.result} />
          </View>
        </View>

        {/* 하단 over-scroll 시의 흰색 배경 설정 */}
        <OverScrollView backgroundColor="#FFFFFF" height={300} bottom={-100} />
      </ScrollView>

      <OverScrollView backgroundColor="#FFFFFF" height={94} bottom={0} />

      <TwoButtonModal
        isVisible={isCreateRoomModalOpen}
        title={`${data.result.memberDetail.nickname}님을 초대할 방이 없어요,\n방을 만드시겠어요?`}
        closeFunc={() => setIsCreateRoomModalOpen(false)}
        leftButtonText="아니오"
        leftButtonFunc={() => setIsCreateRoomModalOpen(false)}
        rightButtonText="예"
        rightButtonFunc={() => {
          setIsCreateRoomModalOpen(false);
          router.push('/room/createRoom');
        }}
      />

      <BottomButtonContainer id={Number(id)} onPress={onPress} />
    </SafeAreaView>
  );
}

export default function UserDetail() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <UserDetailComponent />
    </Suspense>
  );
}
