import React, { useState, Fragment, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, Dimensions, SafeAreaView } from 'react-native';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';
import BottomButton from '@components/common/bottomButton';
import ReportModal from '@components/report/reportComponent';

import { useHasRoomStore } from '@zustand/room/room';
import { useProfileStore } from '@zustand/member/member';
import { useLifeStyleStore, useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useGetChatRoomId } from '@hooks/api/chat-room';
import { useGetMemberStatData } from '@hooks/api/member-stat';

import { getProfileImage } from '@utils/profileImage';

import { UserDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';
import Background from '@assets/userDetail/background.svg';
import NotSelectedListIcon from '@assets/userDetail/listIcon.svg';
import NotSelectedTableIcon from '@assets/userDetail/tableIcon.svg';
import SelectedListIcon from '@assets/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@assets/userDetail/coloredTableIcon.svg';

const UserDetailScreen = ({ navigation, route }: UserDetailScreenProps) => {
  const { memberId } = route.params;

  const { myRoom } = useHasRoomStore();
  const { profile } = useProfileStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { lifeStyle } = useLifeStyleStore();

  const { bottom } = useSafeAreaInsets();
  const width = Dimensions.get('screen').width;

  const [type, setType] = useState<string>('list');

  // const { data: mylifestyledata } = useGetMemberStatData();
  const { data: lifeStyleData } = useGetMemberStatData(memberId);

  // console.log(otherlifestyledata);

  const { data: chatRoomId } = useGetChatRoomId(memberId);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = () => {
    navigation.navigate('ChatRoomScreen', { chatRoomId: chatRoomId.result.chatRoomId });
  };

  const handleList = useCallback(() => {
    setType('list');
  }, []);

  const handleTable = useCallback(() => {
    setType('table');
  }, []);

  const [isInvited, setIsInvited] = useState<boolean>(false);

  const toUserRoom = () => {
    navigation.navigate('RoomDetailScreen', { roomId: lifeStyleData.result.roomId });
  };

  const toEditMyLifeStyle = () => {
    navigation.navigate('LifeStyleEditScreen');
  };

  return (
    <Fragment>
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
              <View className="flex flex-row">
                <Pressable onPress={toChatRoom}>
                  <MessageIcon />
                </Pressable>
                <Pressable>
                  <HeartIcon />
                </Pressable>
              </View>
            </View>

            <View className="flex flex-col px-[23px]">
              <View className="flex flex-row items-center px-[2px]">
                {getProfileImage(lifeStyleData.result.memberDetail.persona, 40, 40)}
                <View className="ml-2 flex flex-col">
                  <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                    {lifeStyleData.result.memberDetail.nickname}
                  </Text>
                  {lifeStyleData.result.memberDetail.memberId !== profile.memberId && (
                    <Text className="text-sm font-medium text-basicFont">
                      나와의 일치율{' '}
                      {lifeStyleData.result.equality !== null && hasLifeStyle
                        ? lifeStyleData.result.equality
                        : '?? '}
                      %
                    </Text>
                  )}
                </View>
              </View>
              {lifeStyleData.result.memberDetail.memberId === profile.memberId ? (
                <Pressable onPress={toEditMyLifeStyle} className="mt-5 rounded-xl bg-main1 p-3">
                  <Text className="text-center text-sm font-semibold text-white">
                    내 라이프스타일 수정하기
                  </Text>
                </Pressable>
              ) : lifeStyleData.result.roomId !== 0 ? (
                <Pressable
                  onPress={toUserRoom}
                  className="mt-5 rounded-xl border border-main1 bg-sub2 p-3"
                >
                  <Text className="text-center text-sm font-semibold text-main1">
                    {lifeStyleData.result.memberDetail.nickname}님이 속한 방 보러가기
                  </Text>
                </Pressable>
              ) : (
                <View className="mt-5 rounded-xl border border-disabledFont bg-colorBox p-3">
                  <Text className="text-center text-sm font-semibold text-disabledFont">
                    {lifeStyleData.result.memberDetail.nickname}님은 아직 속한 방이 없어요
                  </Text>
                </View>
              )}
            </View>

            <View className="mt-5 flex-1 rounded-t-[20px] bg-white pt-3">
              {lifeStyleData.result.memberDetail.memberId !== profile.memberId && (
                <View className="flex flex-row items-center justify-center">
                  {/* 리스트로 보기 */}
                  <Pressable
                    onPress={handleList}
                    className="flex flex-row items-center justify-center p-4"
                  >
                    <View className="flex">
                      {type === 'list' ? <SelectedListIcon /> : <NotSelectedListIcon />}
                    </View>
                    <Text
                      className={`ml-1.5 text-sm ${
                        type === 'list'
                          ? 'font-semibold text-main1'
                          : 'font-medium text-disabledFont'
                      }`}
                    >
                      리스트로 보기
                    </Text>
                  </Pressable>

                  <View className="mx-[18px] h-6 w-px bg-disabled" />

                  {/* 표로 보기 */}
                  <Pressable
                    onPress={handleTable}
                    className="flex flex-row items-center justify-center p-4"
                  >
                    <View className="flex">
                      {type === 'table' ? <SelectedTableIcon /> : <NotSelectedTableIcon />}
                    </View>
                    <Text
                      className={`ml-1.5 text-sm ${
                        type === 'table'
                          ? 'font-semibold text-main1'
                          : 'font-medium text-disabledFont'
                      }`}
                    >
                      표로 보기
                    </Text>
                  </Pressable>
                </View>
              )}

              <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingBottom: bottom }}>
                {type === 'list' && (
                  <ListView
                    memberDetail={lifeStyleData.result.memberDetail}
                    memberStatDetail={lifeStyleData.result.memberStatDetail}
                    openModal={handleReportModal}
                  />
                )}
                {type === 'table' && (
                  <TableView
                    userData={lifeStyle}
                    otherUserData={lifeStyleData.result}
                    openModal={handleReportModal}
                  />
                )}
              </ScrollView>
            </View>
          </View>

          {lifeStyleData.result.memberDetail.memberId !== profile.memberId ? (
            <View className="fixed bottom-[42px] px-5">
              {/* 순서대로 1. 방이 있고 초대한 경우 2. 방이 있고 초대하지 않은 경우 3. 방이 없는 경우 */}
              <BottomButton
                color={
                  myRoom.hasRoom ? (isInvited ? 'bg-colorBox' : 'bg-main1') : 'bg-disabledButton'
                }
                borderColor={myRoom.hasRoom && isInvited ? 'border-main1' : 'border-main1'}
                textColor={
                  myRoom.hasRoom ? (isInvited ? 'text-main1' : 'text-white') : 'text-white'
                }
                text={
                  myRoom.hasRoom
                    ? isInvited
                      ? '초대 취소하기'
                      : '내 방으로 초대하기'
                    : '내 방으로 초대하기'
                }
                disabled={!myRoom.hasRoom}
                onPressFunc={() => setIsInvited(!isInvited)}
              />
            </View>
          ) : (
            <SafeAreaView className="bg-white" />
          )}
        </View>
      </View>

      {isReportModalOpen && (
        <ReportModal memberId={memberId} source="MEMBER_STAT" closeModal={handleReportModal} />
      )}
    </Fragment>
  );
};

export default UserDetailScreen;
