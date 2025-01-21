import { ErrorBoundary } from 'react-error-boundary';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, Fragment, Suspense, useCallback } from 'react';
import { Text, View, Pressable, ScrollView, Dimensions, SafeAreaView } from 'react-native';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';
import BottomButton from '@components/common/bottomButton';
import LoadingComponent from '@components/loading/loading';
import ReportModal from '@components/report/reportComponent';
import TableViewModal from '@components/userDetail/tableViewModal';

import { useHasRoomStore } from '@zustand/room/room';
import { useProfileStore } from '@zustand/member/member';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useGetChatRoomId } from '@hooks/api/chat-room';
import { useGetMemberStatData } from '@hooks/api/member-stat';
import { useDibsOnUser, useDeleteFavorite } from '@hooks/api/favorite';
import {
  useInviteMember,
  useGetRoomRequests,
  useDeleteInviteMember,
  useAcceptRequestMember,
  useCheckRequestedToJoin,
} from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';

import { UserDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';
import Background from '@assets/userDetail/background.svg';
import FilledHeart from '@assets/userDetail/filledHeart.svg';
import NotSelectedListIcon from '@assets/userDetail/listIcon.svg';
import NotSelectedTableIcon from '@assets/userDetail/tableIcon.svg';
import SelectedListIcon from '@assets/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@assets/userDetail/coloredTableIcon.svg';

const UserDetail = ({ navigation, route }: UserDetailScreenProps) => {
  const { memberId } = route.params;

  const { bottom } = useSafeAreaInsets();
  const width = Dimensions.get('screen').width;

  const { myRoom } = useHasRoomStore();
  const { profile } = useProfileStore();
  const { lifeStyle } = useNewLifeStyleStore();

  const userData = {
    memberDetail: profile,
    memberStatDetail: lifeStyle,
  };

  const [type, setType] = useState<string>('list');

  const { data: lifeStyleData, refetch: refetchMemberStatData } = useGetMemberStatData(memberId);

  const { data: chatRoomId } = useGetChatRoomId(memberId);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const { mutateAsync: dibsUser } = useDibsOnUser(memberId, refetchMemberStatData);
  const { mutateAsync: cancelDibsUser } = useDeleteFavorite(
    lifeStyleData.result.favoriteId,
    refetchMemberStatData,
  );

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

  const toEditMyLifeStyle = () => {
    navigation.navigate('LifeStyleEditScreen');
  };

  const { data: isInvited, refetch: refetchCheckRequestedToJoin } =
    useCheckRequestedToJoin(memberId);
  const { mutateAsync: inviteMember } = useInviteMember(
    memberId,
    refetchCheckRequestedToJoin,
    lifeStyleData.result.memberDetail.nickname,
  );
  const { mutateAsync: deleteInvite } = useDeleteInviteMember(
    memberId,
    refetchCheckRequestedToJoin,
  );

  const { refetch: refetchRoomRequest } = useGetRoomRequests();
  const { mutateAsync: acceptRequest } = useAcceptRequestMember(
    memberId,
    refetchMemberStatData,
    refetchRoomRequest,
    lifeStyleData.result.memberDetail.nickname,
  );

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);

  const toLifeStyleOnboarding = () => {
    setIsLifeStyleModalOpen(false);
    navigation.navigate('LifeStyleOnboardingScreen', {
      returnToUser: lifeStyleData.result.memberDetail.memberId,
    });
  };

  return (
    <Fragment>
      <View className="flex-1 bg-white">
        <SafeAreaView className="bg-sub1" />
        <View className="flex-1">
          <View className="flex flex-1 flex-col bg-sub1">
            {/* 상단 헤더 */}
            <View className="mb-[15px] mt-2 flex flex-row justify-between px-5">
              <Background width={width} style={{ position: 'absolute', zIndex: 99 }} />
              <Pressable onPress={toBack} style={{ zIndex: 100 }}>
                <BackButton />
              </Pressable>
              {lifeStyleData.result.memberDetail.memberId !== profile.memberId && (
                <View className="flex flex-row">
                  <Pressable onPress={toChatRoom} className="py-[11px] pl-3.5 pr-2">
                    <MessageIcon />
                  </Pressable>
                  {lifeStyleData.result.favoriteId !== 0 ? (
                    <Pressable onPress={cancelDibsUser} className="px-2.5 py-[11px]">
                      <FilledHeart />
                    </Pressable>
                  ) : (
                    <Pressable onPress={dibsUser} className="px-2.5 py-[11px]">
                      <HeartIcon />
                    </Pressable>
                  )}
                </View>
              )}
            </View>

            <View className="flex flex-col px-[25px]">
              <View className="flex flex-row items-center px-[2px]">
                {getProfileImage(lifeStyleData.result.memberDetail.persona, 40, 40)}
                <View className="ml-2 flex flex-col">
                  <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                    {lifeStyleData.result.memberDetail.nickname}
                  </Text>
                  {lifeStyleData.result.memberDetail.memberId !== profile.memberId && (
                    <Text className="text-sm font-medium text-basicFont">
                      나와의 일치율 {lifeStyleData.result.equality}%
                    </Text>
                  )}
                </View>
              </View>
              {lifeStyleData.result.memberDetail.memberId === profile.memberId && (
                <Pressable onPress={toEditMyLifeStyle} className="mt-5 rounded-xl bg-main1 p-3">
                  <Text className="text-center text-sm font-semibold text-white">
                    내 라이프스타일 수정하기
                  </Text>
                </Pressable>
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
                    userData={userData}
                    otherUserData={lifeStyleData.result}
                    openModal={handleReportModal}
                  />
                )}
              </ScrollView>
            </View>
          </View>

          {/* 타인의 상세 페이지 */}
          {lifeStyleData.result.memberDetail.memberId !== profile.memberId && (
            <View className="fixed bottom-[42px] px-5">
              {/*  */}
              {lifeStyleData.result.hasRequestedRoomEntry && (
                <View className="flex flex-row justify-between space-x-2">
                  <View className="flex-1">
                    <BottomButton
                      color="bg-white"
                      borderColor="border-main1"
                      textColor="text-main1"
                      text="거절"
                      disabled={false}
                      onPressFunc={() => acceptRequest(false)}
                    />
                  </View>

                  <View className="flex-1">
                    <BottomButton
                      color="bg-main1"
                      borderColor="border-main1"
                      textColor="text-white"
                      text="수락"
                      disabled={false}
                      onPressFunc={() => acceptRequest(true)}
                    />
                  </View>
                </View>
              )}

              {/* 방 인원이 다 찬 방의 방장이 타인을 볼 때 */}
              {myRoom.hasRoom &&
                myRoom.isRoomManager &&
                myRoom.isFullRoom &&
                !lifeStyleData.result.hasRequestedRoomEntry && (
                  <BottomButton
                    color="bg-[#c4c4c4]"
                    borderColor="border-[#c4c4c4]"
                    textColor="text-white"
                    text="내 방으로 초대하기"
                    disabled={true}
                    onPressFunc={undefined}
                  />
                )}

              {/* 방 인원이 다 차지 않은 방의 방장이 방이 존재하는 타인을 볼 때 */}
              {myRoom.hasRoom &&
                myRoom.isRoomManager &&
                !myRoom.isFullRoom &&
                lifeStyleData.result.roomId !== 0 &&
                !lifeStyleData.result.hasRequestedRoomEntry && (
                  <BottomButton
                    color="bg-[#c4c4c4]"
                    borderColor="border-[#c4c4c4]"
                    textColor="text-white"
                    text="내 방으로 초대하기"
                    disabled={false}
                    onPressFunc={undefined}
                  />
                )}

              {/* 방 인원이 다 차지 않은 방의 방장이 방이 존재하지 않는 타인을 볼 때 */}
              {myRoom.hasRoom &&
                myRoom.isRoomManager &&
                !myRoom.isFullRoom &&
                lifeStyleData.result.roomId === 0 &&
                isInvited !== undefined &&
                !lifeStyleData.result.hasRequestedRoomEntry && (
                  <BottomButton
                    color={isInvited.result ? 'bg-colorBox' : 'bg-main1'}
                    borderColor="border-main1"
                    textColor={isInvited.result ? 'text-main1' : 'text-white'}
                    text={isInvited.result ? '초대 취소하기' : '내 방으로 초대하기'}
                    disabled={false}
                    onPressFunc={isInvited.result ? deleteInvite : inviteMember}
                  />
                )}

              {/* 방이 존재하지 않는 유저가 방이 존재하는 유저를 볼 때 */}
              {!myRoom.hasRoom && lifeStyleData.result.roomId !== 0 && (
                <BottomButton
                  color="bg-[#c4c4c4]"
                  borderColor="border-[#c4c4c4]"
                  textColor="text-white"
                  text="내 방으로 초대하기"
                  disabled={true}
                  onPressFunc={undefined}
                />
              )}

              {/* 라이프스타일을 입력했고 학교 인증을 한, 방이 존재하지 않는 유저가 방이 존재하지 않는 유저를 볼 때 */}
              {!myRoom.hasRoom && lifeStyleData.result.roomId === 0 && (
                <BottomButton
                  color="bg-main1"
                  borderColor="border-main1"
                  textColor="text-white"
                  text="내 방으로 초대하기"
                  disabled={true}
                  onPressFunc={undefined}
                />
              )}
            </View>
          )}

          {/* 본인의 상세 페이지 */}
          {lifeStyleData.result.memberDetail.memberId == profile.memberId && (
            <SafeAreaView className="bg-white" />
          )}
        </View>
      </View>

      <TableViewModal
        isVisible={isLifeStyleModalOpen}
        closeFunc={() => setIsLifeStyleModalOpen(false)}
        buttonText="라이프스타일 입력하러가기"
        buttonFunc={toLifeStyleOnboarding}
      />

      <ReportModal
        isVisible={isReportModalOpen}
        memberId={memberId}
        source="MEMBER_STAT"
        closeModal={handleReportModal}
      />
    </Fragment>
  );
};

const UserDetailScreen = ({ navigation, route }: UserDetailScreenProps) => {
  return (
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading UserDetail</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <UserDetail navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default UserDetailScreen;
