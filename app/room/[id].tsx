import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/common/background.svg';
import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import GrayArrowIcon from '@/assets/images/common/smaillGrayArrow.svg';
import CopyIcon from '@/assets/images/room/copy.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import TwoButtonModal from '@/components/common/twoButtonModal';
import MemberStatModalComponent from '@/components/roomDetail/memberStatModal';
import { getPersona } from '@/constants/items/characterItem';
import {
  useCheckIsRequestedRoom,
  useExitRoom,
  useGetRoomDetail,
  useSendRoomRequest,
} from '@/hooks/room/room';
import { useCreateRoomLike, useDeleteRoomLike } from '@/hooks/room-favorite/room-favorite';
import { useGetRoomMemberStats } from '@/hooks/room-member-stat/room-member-stat';
import { ChipItem } from '@/type/room';
import { getLifeStyleLabel } from '@/utils/lifeStyle';
import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

export default function RoomDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { memberState } = useMemberStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { roomInfo } = useHasRoomStore();

  const { data, refetch } = useGetRoomDetail(Number(id));
  const { data: isRequested } = useCheckIsRequestedRoom(Number(id));

  const { mutateAsync: deleteLike } = useDeleteRoomLike(data.result.favoriteId, refetch);
  const { mutateAsync: createLike } = useCreateRoomLike(data.result.roomId, refetch);

  const { mutateAsync: sendRequest } = useSendRoomRequest(Number(id));

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);
  const [isMemberStatModalOpen, setIsMemberStatModalOpen] = useState<boolean>(false);

  const [statItem, setStatItem] = useState<ChipItem>({
    title: '',
    memberList: [],
    color: '',
  });
  const { mutateAsync: getStats } = useGetRoomMemberStats();

  const handleStat = async (memberStatKey: string) => {
    const response = await getStats({ roomId: Number(id), memberStatKey });

    console.log(memberStatKey);
    setStatItem({
      title: getLifeStyleLabel(memberStatKey),
      memberList: response.result.memberList,
      color: response.result.color,
    });

    setIsMemberStatModalOpen(true);
  };

  const { mutateAsync: exitRoom } = useExitRoom(Number(id));
  const [isExitRoomModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  const buttonItems = [
    {
      // 본인이 해당 방의 방장인 경우
      type: 'warning',
      isVisible: roomInfo.roomId === data.result.roomId,
      title: '방 나가기',
      onPress: () => setIsExitModalOpen(true),
    },
    {
      // 방이 없고, 라이프스타일이 없는 경우
      type: 'default',
      isVisible: !hasLifeStyle,
      title: '방 참여하기',
      onPress: () => setIsLifeStyleModalOpen(true),
    },
    {
      // 참여 요청을 보낸 경우
      type: 'requested',
      isVisible: hasLifeStyle && roomInfo.roomId === 0 && isRequested.result,
      title: '방 참여 취소하기',
      onPress: () => showRejectToast('이미 다른 방에 참여하고 있어서 초대할 수 없어요'),
    },
    {
      type: 'default',
      isVisible: hasLifeStyle && !isRequested.result,
      title: '방 참여하기',
      onPress: () => sendRequest(),
    },
    // {
    //   // 상대방이 내 방으로 참여 요청을 보낸 경우
    //   type: 'accept',
    //   isVisible:
    //     roomId !== 0 &&
    //     roomData?.result.isRoomManager &&
    //     roomData.result.arrivalMateNum < roomData.result.maxMateNum &&
    //     data.result.roomId === 0 &&
    //     data.result.hasRequestedRoomEntry,
    //   title: '수락거절',
    //   onPress: () => console.log('수락거절'),
    // },
  ];

  const visibleButton = buttonItems.find((item) => item.isVisible);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-subColor1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, rowGap: 20, paddingBottom: 60 }}
          bounces={false}
        >
          <View className="px-[20px] gap-y-5">
            <Background style={{ position: 'absolute' }} />

            <BackHeaderComponent>
              <View className="flex flex-row items-center gap-x-[4px]">
                <Pressable className="pl-[14px] pr-[8px] py-[11px]">
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
              {getPersona(data.result.persona, 40, 40)}
              <View className="gap-y-1">
                <Text className="text-16 font-600 text-emphasizedFont">{data.result.name}</Text>
                <Text className="text-14 font-500 text-basicFont">
                  {data.result.hashtagList.join(' ')}
                </Text>
              </View>
            </View>

            {roomInfo.roomId === data.result.roomId ? (
              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(data.result.inviteCode);
                  Alert.alert('초대코드가 복사되었습니다!');
                }}
                className="bg-subColor2 rounded-xl border border-mainColor p-[12px] flex flex-row items-center justify-center gap-x-[4px]"
              >
                <Text className="text-14 font-600 text-mainColor text-center">
                  {data.result.inviteCode}
                </Text>
                <CopyIcon />
              </Pressable>
            ) : (
              <View className="bg-subColor2 rounded-xl border border-mainColor p-[12px]">
                <Text className="text-14 font-600 text-mainColor text-center">
                  방 평균일치율 {data.result.equality ?? '??'}%
                </Text>
              </View>
            )}
          </View>

          <View className="bg-white flex-1 gap-y-14 pt-8 rounded-t-[20px] pb-[68px]">
            <View className="px-[20px] gap-y-[12px]">
              <View className="flex flex-row justify-between">
                <Text className="text-16 font-600 text-emphasizedFont">방 정보</Text>
                <Text className="text-12 font-500 text-disabledFont">
                  <Text className="font-600 text-mainColor">{data.result.arrivalMateNum}</Text> /{' '}
                  {data.result.maxMateNum}
                </Text>
              </View>

              <View className="px-4 py-1 rounded-xl border border-strokeColor">
                {data.result.mateDetailList.map((mate, index) => (
                  <Pressable
                    key={mate.mateId}
                    onPress={() => router.push(`/user/${mate.memberId}`)}
                    className={`flex flex-row justify-between items-center py-3 ${index !== data.result.mateDetailList.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
                  >
                    <View className="flex flex-row items-center gap-x-[8px]">
                      {getPersona(mate.persona, 24, 24)}
                      <Text className="text-14 font-500 text-emphasizedFont">{mate.nickname}</Text>
                    </View>

                    <View className="flex flex-row items-center gap-x-2">
                      {memberState.memberId !== mate.memberId && (
                        <Text className="text-14 font-500 text-colorFont">
                          {mate.mateEquality ?? '?? '}%
                        </Text>
                      )}
                      <GrayArrowIcon />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="px-[20px] gap-y-[12px]">
              <Text className="text-16 font-600 leading-16 text-emphasizedFont">기숙사 정보</Text>

              <View className="p-4 rounded-xl border border-strokeColor">
                <View className="flex flex-row items-center gap-x-[12px]">
                  <Text className="text-14 font-500 leading-14 text-colorFont">분류</Text>
                  <Text className="text-14 font-500 leading-14 text-basicFont">
                    {data.result.dormitoryName}
                  </Text>
                </View>

                <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

                <View className="flex flex-row items-center gap-x-[12px]">
                  <Text className="text-14 font-500 text-colorFont">인실</Text>
                  <Text className="text-14 font-500 text-basicFont">
                    {data.result.maxMateNum}인실
                  </Text>
                </View>
              </View>
            </View>

            <View className="px-[20px] gap-y-[12px]">
              <Text className="text-16 font-600 text-emphasizedFont">
                룸메이트 라이프스타일 한 눈에 보기
              </Text>

              <View className="flex flex-row flex-wrap gap-2">
                {data.result.difference.blue.map((chip, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleStat(chip)}
                    className="px-[14px] py-[8px] rounded-full border border-mainColor bg-subColor1"
                  >
                    <Text className="text-12 font-600 text-mainColor">
                      {getLifeStyleLabel(chip)}
                    </Text>
                  </Pressable>
                ))}

                {data.result.difference.red.map((chip, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleStat(chip)}
                    className="px-[14px] py-[8px] rounded-full border border-warningColor bg-warningSubColor"
                  >
                    <Text className="text-12 font-600 text-warningColor">
                      {getLifeStyleLabel(chip)}
                    </Text>
                  </Pressable>
                ))}

                {data.result.difference.white.map((chip, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleStat(chip)}
                    className="px-[14px] py-[8px] rounded-full border border-transparent bg-white shadow-chipback"
                  >
                    <Text className="text-12 font-500 text-disabledFont">
                      {getLifeStyleLabel(chip)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

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

        <View className="absolute bottom-0 w-full px-[22px] pb-[42px] bg-white">
          {visibleButton && visibleButton.type === 'warning' && (
            <BottomButton
              buttonText={visibleButton.title}
              disabled={false}
              onPress={visibleButton.onPress}
              borderColor="border-warningColor"
              backColor="bg-[#FFDDDD]"
              textColor="text-warningColor"
            />
          )}

          {visibleButton && visibleButton.type === 'default' && (
            <BottomButton
              buttonText={visibleButton.title}
              disabled={false}
              onPress={visibleButton.onPress}
            />
          )}

          {visibleButton && visibleButton.type === 'requested' && (
            <BottomButton
              buttonText={visibleButton.title}
              disabled={false}
              onPress={visibleButton.onPress}
              borderColor="border-mainColor"
              backColor="bg-colorBox"
              textColor="text-mainColor"
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

        <MemberStatModalComponent
          isVisible={isMemberStatModalOpen}
          closeModal={() => setIsMemberStatModalOpen(false)}
          item={statItem}
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
      </SafeAreaView>
    </View>
  );
}
