import { ErrorBoundary } from 'react-error-boundary';
import React, { useState, Suspense, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import HeaderComponent from '@components/cozyHome/header';
import LoadingComponent from '@components/loading/loading';
import MyRoomComponent from '@components/cozyHome/myRoomComponent';
import RecommendUserList from '@components/cozyHome/recommentUserList';
import RecommendRoomList from '@components/cozyHome/recommendRoomList';
import RequestRoomsComponent from '@components/cozyHome/requestRoomComponent';
import RequestUsersComponent from '@components/cozyHome/requestUserComponent';
import InvitedRoomsComponent from '@components/cozyHome/invitedRoomComponent';

import { useHasRoomStore } from '@zustand/room/room';

import { useGetMemberList } from '@hooks/api/member-stat';
import { useGetFiveRandomRoom } from '@hooks/api/room-recommend';
import {
  useGetMyRoomData,
  useGetInvitedRooms,
  useGetRequestRooms,
  useGetRoomRequests,
} from '@hooks/api/room';

import { CozyHomeScreenProps } from '@type/param/stack';

const CozyHome = ({ navigation }: CozyHomeScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { myRoom } = useHasRoomStore();

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const { data: roomData, refetch: refetchMyRoom } = useGetMyRoomData();
  const { data: requestRoomList, refetch: refetchRoomList } = useGetRequestRooms();
  const { data: requestMemberList, refetch: refetchMemberList } = useGetRoomRequests();
  const { data: requestedRoomList, refetch: refetchRequestedRoomList } = useGetInvitedRooms();
  const { data: userList, refetch: refetchUserList } = useGetMemberList();
  const { data: roomList, refetch: refetchRandomRoomList } = useGetFiveRandomRoom(5, 0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchMyRoom();
    refetchRoomList();
    refetchRequestedRoomList();
    refetchMemberList();
    refetchUserList();
    refetchRandomRoomList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  console.log(requestedRoomList);

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
      }}
    >
      <ScrollView
        onScroll={handleScroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HeaderComponent navigation={navigation} handleLayout={handleLayout} />

        <View className="bg-white pt-6" style={{ paddingBottom: bottom + 80 }}>
          {/* 방이 없는 사용자에 대하여 참여 요청한 방 목록 컴포넌트 */}
          {myRoom.hasRoom &&
            requestRoomList !== undefined &&
            requestRoomList?.result.length !== 0 && (
              <>
                <RequestRoomsComponent navigation={navigation} roomList={requestRoomList?.result} />

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

          {/* 방이 없는 사용자에 대하여 참여 요청 받은 방 목록 컴포넌트 */}
          {myRoom.hasRoom && requestedRoomList !== undefined && (
            <>
              <InvitedRoomsComponent
                navigation={navigation}
                requestCount={requestedRoomList?.result.requestCount}
                roomList={requestedRoomList?.result.roomList}
              />

              <View className="my-6 h-2.5 bg-[#F7F9FA]" />
            </>
          )}

          {/* 방이 있는 사용자에 대하여 본인 방 컴포넌트 */}
          {myRoom.hasRoom && roomData && (
            <>
              <MyRoomComponent navigation={navigation} roomData={roomData.result} />

              <View className="my-6 h-2.5 bg-[#F7F9FA]" />
            </>
          )}

          {/* 방장인 사용자에 대하여 참여 요청한 사용자 목록 컴포넌트 */}
          {myRoom.hasRoom &&
            requestMemberList !== undefined &&
            requestMemberList.result.length !== 0 &&
            roomData !== null &&
            roomData.result.isRoomManager && (
              <>
                <RequestUsersComponent
                  navigation={navigation}
                  userList={requestMemberList?.result}
                />

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

          {/* 룸메이트 추천 컴포넌트 */}
          <RecommendUserList navigation={navigation} users={userList.result.memberList} />

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          {/* 방 추천 컴포넌트 */}
          <RecommendRoomList navigation={navigation} rooms={roomList.result.result} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CozyHomeScreen = ({ navigation, route }: CozyHomeScreenProps) => {
  return (
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading CozyHome</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <CozyHome navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CozyHomeScreen;
