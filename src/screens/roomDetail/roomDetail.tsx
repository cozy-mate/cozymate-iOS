import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, Dimensions, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import LifeStyleModal from '@components/roomDetail/lifeStyleModal';
import MemberComponent from '@components/roomDetail/memberComponent';

import { useHasRoomStore } from '@zustand/room/room';
// import { useMemberInfoStore } from '@zustand/member/member';

import { sendRoomRequest } from '@server/api/room';
import { getChipDetailData } from '@server/api/room-member-stat';

import { useGetChatRoomId } from '@hooks/api/chat-room';
import {
  useExitRoom,
  useGetRoomData,
  useSendRoomRequest,
  useDeleteRoomRequest,
} from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';
import { getLifestyleLabel, LifestyleOptionKey } from '@utils/getLifeStyleIcon';

import { RoomDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/settingIcon.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';
import Background from '@assets/userDetail/background.svg';

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

  const { myRoom } = useHasRoomStore();

  const { bottom } = useSafeAreaInsets();
  const width = Dimensions.get('screen').width;

  const { data: roomData } = useGetRoomData(roomId);
  const { data: chatRoomId } = useGetChatRoomId(roomData.result.managerMemberId);

  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = () => {
    navigation.navigate('ChatRoomScreen', {
      chatRoomId: chatRoomId.result.chatRoomId,
    });
  };

  const [isRequested, setIsRequested] = useState<boolean>(false);

  const toUserDetail = (member: MemberItem) => {
    navigation.navigate('UserDetailScreen', { memberId: member.memberId });
  };

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [chipDetailData, setChipDetailData] = useState<Item[]>([]);

  const handleLifeStyleModal = () => {
    setIsLifeStyleModalOpen(!isLifeStyleModalOpen);
  };

  const { mutateAsync: mutateSendRoomRequest } = useSendRoomRequest(roomId);
  const { mutateAsync: mutateDeleteRoomRequest } = useDeleteRoomRequest(roomId);
  const { mutateAsync: mutateExitRoom } = useExitRoom(roomId);

  const sendRequest = async () => {
    await mutateSendRoomRequest(roomId);
  };

  const deleteRequest = async () => {
    await mutateDeleteRoomRequest(roomId);
  };

  const exitRoom = async () => {
    await mutateExitRoom(roomId);
  };

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

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-sub1" />
      <View className="flex-1">
        <View className="flex flex-1 flex-col bg-sub1">
          {/* 상단 헤더 */}
          <View className="mb-[15px] mt-2 flex flex-row justify-between pl-3 pr-5">
            <Background width={width} style={{ position: 'absolute', zIndex: 99 }} />
            <Pressable onPress={toBack} style={{ zIndex: 100 }}>
              <BackButton />
            </Pressable>
            {roomId === myRoom.roomId ? (
              <Pressable>
                <SettingIcon />
              </Pressable>
            ) : (
              <View className="flex flex-row">
                <Pressable onPress={toChatRoom}>
                  <MessageIcon />
                </Pressable>
                <Pressable>
                  <HeartIcon />
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

            <View className="flex rounded-xl border border-main1 bg-sub2 p-3">
              <Text className="text-center text-sm font-semibold text-main1">
                방 평균일치율 {roomData.result.equality}%
              </Text>
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
                      {roomData.result.roomType}
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
          {/* 순서대로 1. 해당 방에 참가한 경우 2. 해당 방이 아닌 다른 방에 참가한 경우 3. 해당 방에 요청을 보낸 경우 4. 해당 방에 요청을 보내지 않은 경우 */}
          {myRoom.roomId === roomId && (
            <BottomButton
              color="bg-[#f85e5e]"
              borderColor="border-[#f85e5e]"
              textColor="text-white"
              text="방 나가기"
              disabled={myRoom.roomId !== roomId && myRoom.roomId !== 0}
              onPressFunc={exitRoom}
            />
          )}

          {myRoom.roomId !== roomId && myRoom.roomId !== 0 && (
            <BottomButton
              color="bg-[#c4c4c4]"
              borderColor="border-[#c4c4c4]"
              textColor="text-white"
              text="방 참여 요청"
              disabled={myRoom.roomId !== roomId && myRoom.roomId !== 0}
              onPressFunc={undefined}
            />
          )}

          {myRoom.roomId === 0 && isRequested && (
            <BottomButton
              color="bg-colorBox"
              borderColor="border-main1"
              textColor="text-main1"
              text="방 참여 요청 취소"
              disabled={myRoom.roomId !== roomId && myRoom.roomId !== 0}
              onPressFunc={deleteRequest}
            />
          )}

          {myRoom.roomId === 0 && !isRequested && (
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="방 참여 요청"
              disabled={myRoom.roomId !== roomId && myRoom.roomId !== 0}
              onPressFunc={sendRequest}
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
