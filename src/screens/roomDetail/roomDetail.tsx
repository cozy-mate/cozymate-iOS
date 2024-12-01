import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, Dimensions, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import ControlModal from '@components/roomDetail/controlModal';
import LifeStyleModal from '@components/roomDetail/lifeStyleModal';
import MemberComponent from '@components/roomDetail/memberComponent';

import { useHasRoomStore } from '@zustand/room/room';
import { useIsVerifiedStore } from '@zustand/member/member';
import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { getChipDetailData } from '@server/api/room-member-stat';

import { useGetChatRoomId } from '@hooks/api/chat-room';
import { useDibsOnRoom, useDeleteFavorite } from '@hooks/api/favorite';
import {
  useExitRoom,
  useGetRoomData,
  useCheckRequested,
  useSendRoomRequest,
  useChangeRoomPublic,
  useDeleteRoomRequest,
} from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';
import { getLifestyleLabel, LifestyleOptionKey } from '@utils/getLifeStyleIcon';

import { RoomDetailScreenProps } from '@type/param/stack';

import ExitButton from '@assets/exitButton.svg';
import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/settingIcon.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';
import Background from '@assets/userDetail/background.svg';
import FilledHeart from '@assets/userDetail/filledHeart.svg';

interface MemberItem {
  memberId: number;
  mateId: number;
  nickname: string;
  persona: number;
  mateEquality: number;
}

interface Item {
  memberDetail: {
    memberId: number;
    nickname: string;
    gender: string;
    birthday: string;
    universityName: string;
    majorName: string;
    persona: number;
  };
  memberStat: Record<LifestyleOptionKey, string | number>;
}

const RoomDetailScreen = ({ navigation, route }: RoomDetailScreenProps) => {
  const { roomId } = route.params;

  // 스타일 관련
  const { bottom } = useSafeAreaInsets();
  const width = Dimensions.get('screen').width;

  // 내 방인지 여부 및 라이프스타일 존재 여부
  const { myRoom } = useHasRoomStore();
  const { isVerified } = useIsVerifiedStore();
  const { hasLifeStyle } = useHasLifeStyleStore();

  // 방 참여 요청 여부 확인
  const { data: isRequested, refetch: refetchCheckRequested } = useCheckRequested(roomId);
  // 방 정보 조회
  const { data: roomData, refetch: refetchRoomData } = useGetRoomData(roomId);
  // 해당 방의 방장과의 쪽지방 조회
  const { data: chatRoomId } = useGetChatRoomId(roomData.result.managerMemberId);

  // 상단 헤더 관련 메서드
  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = () => {
    navigation.navigate('ChatRoomScreen', {
      chatRoomId: chatRoomId.result.chatRoomId,
    });
  };

  const { mutateAsync: cancelDibsRoom } = useDeleteFavorite(
    roomData.result.favoriteId,
    refetchRoomData,
  );
  const { mutateAsync: dibsRoom } = useDibsOnRoom(roomId, refetchRoomData);

  // 방 인원 상세 페이지 이동
  const toUserDetail = (member: MemberItem) => {
    navigation.navigate('UserDetailScreen', { memberId: member.memberId });
  };

  // 방 인원 라이프스타일 상세 모달
  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);
  // 라이프스타일 이름
  const [title, setTitle] = useState<string>('');
  // 라이프스타일 색상
  const [color, setColor] = useState<string>('');
  // 라이프스타일 상세 정보
  const [chipDetailData, setChipDetailData] = useState<Item[]>([]);

  const handleLifeStyleModal = () => {
    setIsLifeStyleModalOpen(!isLifeStyleModalOpen);
  };

  // 방 참여 요청
  const { mutateAsync: mutateSendRoomRequest } = useSendRoomRequest(roomId, refetchCheckRequested);
  // 방 참여 요청 취소
  const { mutateAsync: mutateDeleteRoomRequest } = useDeleteRoomRequest(
    roomId,
    refetchCheckRequested,
  );

  // 방 나가기
  const { mutateAsync: mutateExitRoom } = useExitRoom(roomId);

  // 방 공개방으로 전환
  const { mutateAsync: mutateChangeRoomPublic } = useChangeRoomPublic(roomId);

  // 방 참여 요청
  const sendRequest = async () => {
    await mutateSendRoomRequest(roomId);
  };

  // 방 참여 요청 취소
  const deleteRequest = async () => {
    await mutateDeleteRoomRequest(roomId);
  };

  // 라이프스타일 없는 인원 이동
  const toLifeStyleOnboarding = () => {
    navigation.navigate('LifeStyleOnboardingScreen', { returnToRoom: roomId });
  };

  // 학교 인증하지 않은 인원 이동
  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen', {
      verified: Boolean(isVerified),
      returnToRoom: roomId,
    });
  };

  // 방 수정
  const toEditRoom = async () => {
    navigation.navigate('EditRoomScreen', {
      id: roomId,
      type: roomData.result.roomType,
    });
  };

  // 방 나가기
  const exitRoom = async () => {
    await mutateExitRoom(roomId);
    navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
  };

  // 방 인원 라이프스타일 칩 클릭 메서드
  const handleChipClick = async (chip: LifestyleOptionKey): Promise<void> => {
    try {
      const response = await getChipDetailData(roomId, chip);

      setIsLifeStyleModalOpen(true);
      setTitle(getLifestyleLabel(chip));
      setColor(response.result.color);
      setChipDetailData(response.result.memberList);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // 방장 케밥 모달
  const [isControlModalOpen, setIsControlModalOpen] = useState<boolean>(false);

  // 케밥 모달 메서드
  const handleControlModal = () => {
    setIsControlModalOpen(!isControlModalOpen);
  };

  // 케밥 모달 아이템
  const items = [
    {
      index: 1,
      name: '수정하기',
      pressFunc: toEditRoom,
    },
    { index: 2, name: '방 나가기', pressFunc: exitRoom },

    {
      index: 3,
      name: roomData.result.roomType === 'PUBLIC' ? '비공개방 전환' : '공개방 전환',
      pressFunc:
        roomData.result.roomType === 'PUBLIC'
          ? () => console.log('성공') //mutateChangeRoomPublic
          : mutateChangeRoomPublic,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-sub1" />
      <View className="flex-1">
        <View className="flex flex-1 flex-col bg-sub1">
          {/* 상단 헤더 */}
          <View className="mb-5 mt-2 flex flex-row justify-between px-5">
            <Background width={width} style={{ position: 'absolute', zIndex: 99 }} />
            <Pressable onPress={toBack} style={{ zIndex: 100 }}>
              <BackButton />
            </Pressable>
            {roomId !== myRoom.roomId ? (
              <View className="flex flex-row">
                <Pressable onPress={toChatRoom} className="py-[11px] pl-3.5 pr-2">
                  <MessageIcon />
                </Pressable>

                {roomData.result.favoriteId !== 0 ? (
                  <Pressable onPress={cancelDibsRoom} className="px-2.5 py-[11px]">
                    <FilledHeart />
                  </Pressable>
                ) : (
                  <Pressable onPress={dibsRoom} className="px-2.5 py-[11px]">
                    <HeartIcon />
                  </Pressable>
                )}
              </View>
            ) : roomData.result.isRoomManager ? (
              <View>
                <Pressable onPress={handleControlModal}>
                  <SettingIcon />
                </Pressable>

                {isControlModalOpen && (
                  <ControlModal items={items} closeModal={handleControlModal} />
                )}
              </View>
            ) : (
              <View className="flex flex-row space-x-1">
                <Pressable onPress={toChatRoom} className="py-[11px] pl-3.5 pr-2">
                  <MessageIcon />
                </Pressable>
                <Pressable onPress={exitRoom} className="p-2">
                  <ExitButton />
                </Pressable>
              </View>
            )}
          </View>

          <View className="mb-6 flex flex-col px-5">
            <View className="mb-5 flex flex-row items-center">
              {getProfileImage(roomData.result.persona, 40, 40)}
              <View className="ml-2 flex flex-col">
                <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                  {roomData.result.name}
                </Text>
                <View className="flex flex-row">
                  {roomData.result.hashtagList.length !== 0 ? (
                    roomData.result.hashtagList.map((hash, index) => (
                      <Text key={index} className="mr-1 text-sm font-medium text-basicFont">
                        #{hash}
                      </Text>
                    ))
                  ) : (
                    <Text className="text-sm font-medium text-basicFont">비공개방이에요</Text>
                  )}
                </View>
              </View>
            </View>

            <View className="relative z-10">
              <View className="flex rounded-xl border border-main1 bg-sub2 p-3">
                <Text className="text-center text-sm font-semibold text-main1">
                  방 평균일치율{' '}
                  {roomData.result.equality !== null
                    ? roomData.result.equality
                    : roomData.result.arrivalMateNum === 1
                    ? '- '
                    : '?? '}
                  %
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1 rounded-t-[20px] bg-white pt-[32px]">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingBottom: bottom }}>
              {/* <View className="mb-16 px-5">
                <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                <Text className="text-main1">{roomData.requestList.length}</Text>개의
                {'\n'}룸메이트 요청이 도착했어요
              </Text>

                <View className="rounded-xl border border-[#F1F2F4] px-4 py-2">
                {roomData.requestList.map((request, index) => (
                  <MemberComponent key={index} index={index} memberData={request} />
                ))}
              </View>
              </View> */}

              <View className="mb-16 px-5">
                <View className="mb-4 flex flex-row items-center justify-between px-1">
                  <Text className="text-base font-semibold text-emphasizedFont">방정보</Text>
                  <Text className="text-xs font-medium text-disabledFont">
                    <Text className="text-main1">{roomData.result.arrivalMateNum}</Text> /{' '}
                    {roomData.result.maxMateNum}
                  </Text>
                </View>

                <View className="rounded-xl border border-[#F1F2F4] px-4 py-2">
                  {roomData.result.mateDetailList &&
                    roomData.result.mateDetailList.map((member, index) => (
                      <MemberComponent
                        key={index}
                        index={index}
                        memberData={member}
                        length={roomData.result.arrivalMateNum}
                        managerMemberId={roomData.result.managerMemberId}
                        pressFunc={toUserDetail}
                      />
                    ))}
                </View>
              </View>

              <View className="mb-16 px-5">
                <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                  기숙사 정보
                </Text>

                <View className="rounded-xl border border-[#F1F2F4] p-4">
                  <View className="flex flex-row border-b border-b-[#F1F2F4] pb-3">
                    <Text className="mr-3 text-sm font-medium text-colorFont">분류</Text>
                    <Text className="text-sm font-medium text-basicFont">
                      {roomData.result.dormitoryName}
                    </Text>
                  </View>
                  <View className="flex flex-row pt-3">
                    <Text className="mr-3 text-sm font-medium text-colorFont">인실</Text>
                    <Text className="text-sm font-medium text-basicFont">
                      {roomData.result.maxMateNum}인실
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-16 pl-5 pr-3">
                <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                  룸메이트 라이프스타일 한 눈에 보기
                </Text>

                <View className="flex flex-row flex-wrap">
                  {roomData.result.difference.blue.map((blue, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleChipClick(blue)}
                      className="mb-2 mr-2 rounded-full border border-main1 bg-sub1 px-3.5 py-2"
                    >
                      <Text className="text-xs font-semibold text-main1">
                        {getLifestyleLabel(blue)}
                      </Text>
                    </Pressable>
                  ))}

                  {roomData.result.difference.red.map((red, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleChipClick(red)}
                      className="mb-2 mr-2 rounded-full border border-[#FF6868] bg-[#FFCACA] px-3.5 py-2"
                    >
                      <Text className="text-xs font-semibold text-[#FF6868]">
                        {getLifestyleLabel(red)}
                      </Text>
                    </Pressable>
                  ))}

                  {roomData.result.difference.white.map((white, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleChipClick(white)}
                      className="mb-2 mr-2 rounded-full border border-disabledFont bg-white px-3.5 py-2"
                    >
                      <Text className="text-xs font-medium text-disabledFont">
                        {getLifestyleLabel(white)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <View className="fixed bottom-[42px] px-5">
          {/* 내 방이 아닌 다른 방을 조회하는 경우 */}
          {myRoom.roomId !== roomId && myRoom.roomId !== 0 && (
            <BottomButton
              color="bg-[#c4c4c4]"
              borderColor="border-[#c4c4c4]"
              textColor="text-white"
              text="방 참여 요청"
              disabled={true}
              onPressFunc={sendRequest}
            />
          )}

          {/* 방이 없는 사용자가 참여 요청을 보낸 경우 */}
          {myRoom.roomId === 0 && isRequested.result && (
            <BottomButton
              color="bg-colorBox"
              borderColor="border-main1"
              textColor="text-main1"
              text="방 참여 요청 취소"
              disabled={false}
              onPressFunc={deleteRequest}
            />
          )}

          {/* 방이 없는 사용자가 참여 요청을 보내지 않은 경우 */}
          {myRoom.roomId === 0 && !isRequested.result && hasLifeStyle && isVerified && (
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="방 참여 요청하기"
              disabled={false}
              onPressFunc={sendRequest}
            />
          )}

          {/* 라이프스타일이 없고 방이 없는 사용자가 참여 요청을 보내지 않은 경우 */}
          {myRoom.roomId === 0 && !isRequested.result && !hasLifeStyle && (
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="라이프스타일 입력하고 방 참여하기"
              disabled={false}
              onPressFunc={toLifeStyleOnboarding}
            />
          )}

          {/* 라이프스타일은 있지만 학교인증이 되지 않은 방이 없는 사용자가 참여 요청을 보내지 않은 경우 */}
          {myRoom.roomId === 0 && !isRequested.result && hasLifeStyle && !isVerified && (
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="학교 인증하고 방 참여하기"
              disabled={false}
              onPressFunc={toSchoolAuthentication}
            />
          )}
        </View>
      </View>

      {isLifeStyleModalOpen && (
        <LifeStyleModal
          title={title}
          color={color}
          memberList={chipDetailData}
          closeModal={handleLifeStyleModal}
        />
      )}
    </View>
  );
};

export default RoomDetailScreen;
