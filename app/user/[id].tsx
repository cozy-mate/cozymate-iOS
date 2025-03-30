import { useLocalSearchParams, useRouter } from 'expo-router';
import { Suspense, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/common/background.svg';
import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import SelectedListIcon from '@/assets/images/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@/assets/images/userDetail/coloredTableIcon.svg';
import ListIcon from '@/assets/images/userDetail/listIcon.svg';
import TableIcon from '@/assets/images/userDetail/tableIcon.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import TwoButtonModal from '@/components/common/twoButtonModal';
import AdditionalInfoComponent from '@/components/userDetail/additionalInfo';
import BasicInfoComponent from '@/components/userDetail/basicInfo';
import DormitoryInfoComponent from '@/components/userDetail/dormitoryInfo';
import EssentialInfoComponent from '@/components/userDetail/essentialInfo';
import TableInfoComponent from '@/components/userDetail/tableInfo';
import { getPersona } from '@/constants/items/characterItem';
import { useCreateMemberLike, useDeleteMemberLike } from '@/hooks/member-favorite/member-favorite';
import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';
import { useGetMyRoomDetail, useInviteMember } from '@/hooks/room/room';
import { showRejectToast } from '@/utils/toast';
import { useHasRoomStore } from '@/zustand/room/room';

export default function UserDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { roomId } = useHasRoomStore();

  const { data, refetch } = useGetMemberDetail(Number(id));
  const { data: roomData } = useGetMyRoomDetail();

  const [type, setType] = useState<string>('LIST');

  const { mutateAsync: deleteLike } = useDeleteMemberLike(data.result.favoriteId, refetch);
  const { mutateAsync: createLike } = useCreateMemberLike(
    data.result.memberDetail.memberId,
    refetch,
  );

  const { mutateAsync: inviteMember } = useInviteMember(Number(id));

  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);

  const buttonItems = [
    {
      // 본인이 방이 없는 경우
      type: 'default',
      isVisible: roomId === 0,
      title: '내 방으로 초대하기',
      onPress: () => setIsCreateRoomModalOpen(true),
    },
    {
      // 상대방이 이미 방이 있는 경우
      type: 'default',
      isVisible: roomId !== 0 && roomData?.result.isRoomManager && data.result.roomId !== 0,
      title: '내 방으로 초대하기',
      onPress: () => inviteMember(),
    },
    {
      // 방에 인원이 다 찬 경우
      type: 'default',
      isVisible:
        roomId !== 0 &&
        roomData?.result.isRoomManager &&
        roomData.result.arrivalMateNum === roomData.result.maxMateNum,
      title: '내 방으로 초대하기',
      onPress: () => showRejectToast('방 인원이 꽉차서 초대할 수 없어요'),
    },
    {
      // 초대 가능 상태
      type: 'default',
      isVisible:
        roomId !== 0 &&
        roomData?.result.isRoomManager &&
        roomData.result.arrivalMateNum < roomData.result.maxMateNum &&
        data.result.roomId === 0 &&
        !data.result.hasRequestedRoomEntry,

      title: '내 방으로 초대하기',
      onPress: () => showRejectToast('방 인원이 꽉차서 초대할 수 없어요'),
    },
    {
      // 상대방이 내 방으로 참여 요청을 보낸 경우
      type: 'accept',
      isVisible:
        roomId !== 0 &&
        roomData?.result.isRoomManager &&
        roomData.result.arrivalMateNum < roomData.result.maxMateNum &&
        data.result.roomId === 0 &&
        data.result.hasRequestedRoomEntry,
      title: '수락거절',
      onPress: () => console.log('수락거절'),
    },
  ];

  const visibleButton = buttonItems.find((item) => item.isVisible);

  return (
    <Suspense>
      <SafeAreaView className="flex-1 bg-subColor1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, rowGap: 20, paddingBottom: 60 }}
          bounces={false}
        >
          <View className="px-[20px] gap-y-5">
            <Background style={{ position: 'absolute' }} />

            <BackHeaderComponent>
              <View className="flex flex-row items-center gap-x-[4px]">
                <Pressable
                  onPress={() =>
                    router.push(
                      `/chat/send/${Number(id)}?nickname=${encodeURIComponent(data.result.memberDetail.nickname)}`,
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

            <View className="flex flex-row items-center gap-x-[8px]">
              {getPersona(data.result.memberDetail.persona, 40, 40)}
              <View className="gap-y-1">
                <Text className="text-16 font-600 text-emphasizedFont">
                  {data.result.memberDetail.nickname}
                </Text>
                <Text className="text-14 font-500 text-basicFont">
                  나와의 일치율 {data.result.equality ?? '??'}%
                </Text>
              </View>
            </View>

            {data.result.roomId !== 0 ? (
              <Pressable
                onPress={() => router.push(`/room/${data.result.roomId}`)}
                className="bg-mainColor rounded-xl border border-mainColor p-3"
              >
                <Text className="text-14 font-600 text-white text-center">
                  {data.result.memberDetail.nickname}님이 속한 방 바로 가기
                </Text>
              </Pressable>
            ) : (
              <View className="bg-colorBox rounded-xl border border-disabledFont p-3">
                <Text className="text-14 font-600 text-disabledFont text-center">
                  {data.result.memberDetail.nickname}님은 아직 속한 방이 없어요
                </Text>
              </View>
            )}
          </View>

          <View className="bg-white gap-y-[16px] flex-1 pt-3 rounded-t-[20px] pb-[68px]">
            <View className="flex flex-row justify-center items-center">
              <Pressable
                onPress={() => setType('LIST')}
                className="flex flex-row items-center gap-x-[6px] p-[16px]"
              >
                {type === 'LIST' ? <SelectedListIcon /> : <ListIcon />}
                <Text
                  className={`text-14 ${type === 'LIST' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  리스트로 보기
                </Text>
              </Pressable>

              <View className="h-[24px] w-[1px] mx-[18px] bg-disabledColor" />

              <Pressable
                onPress={() => setType('TABLE')}
                className="flex flex-row items-center gap-x-[6px] p-[16px]"
              >
                {type === 'TABLE' ? <SelectedTableIcon /> : <TableIcon />}
                <Text
                  className={`text-14 ${type === 'TABLE' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  표로 보기
                </Text>
              </Pressable>
            </View>

            <View className="gap-y-14">
              {type === 'LIST' ? (
                <>
                  <BasicInfoComponent id={Number(id)} />
                  <DormitoryInfoComponent id={Number(id)} />
                  <EssentialInfoComponent id={Number(id)} />
                </>
              ) : (
                <TableInfoComponent id={Number(id)} />
              )}
              <AdditionalInfoComponent id={Number(id)} />
            </View>
          </View>
        </ScrollView>

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

        <View className="absolute bottom-0 w-full px-[22px] pb-[42px] bg-white">
          {visibleButton && visibleButton.type === 'default' && (
            <BottomButton
              buttonText={visibleButton.title}
              disabled={false}
              onPress={visibleButton.onPress}
            />
          )}

          {visibleButton && visibleButton.type === 'accept' && (
            <View className="gap-x-[8px] flex flex-row items-center">
              <Pressable className="bg-white border border-mainColor rounded-xl p-[16px] flex-1">
                <Text className="text-16 font-600 leading-16 text-mainColor text-center">거절</Text>
              </Pressable>
              <Pressable className="bg-mainColor border border-mainColor rounded-xl p-[16px] flex-1">
                <Text className="text-16 font-600 leading-16 text-white text-center">수락</Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Suspense>
  );
}
