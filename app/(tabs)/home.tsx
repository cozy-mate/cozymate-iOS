import { Fragment, useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@/components/cozyHome/Header';
import MyRoomComponent from '@/components/cozyHome/myRoom';
import ReceivedRequestComponent from '@/components/cozyHome/receivedRequest';
import RecommendRoomComponent from '@/components/cozyHome/recommendRoom';
import RecommendRoommateComponent from '@/components/cozyHome/recommendRoommate';
import SentRequestComponent from '@/components/cozyHome/sentRequest';
import { useGetHomeMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import {
  useGetMyRoomDetail,
  useGetReceivedRequestList,
  useGetSentRequestRoomList,
} from '@/hooks/room/room';
import { useGetHomeRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

export default function HomeScreen() {
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { roomInfo } = useHasRoomStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { refetch: refetchMyRoom } = useGetMyRoomDetail();
  const { refetch: refetchReceivedRequest } = useGetReceivedRequestList();

  // 참여요청을 보낸 목록
  const { data, refetch: refetchSentRequest } = useGetSentRequestRoomList(3);

  const { refetch: refetchRandomMemberList } = useGetRandomMemberList();
  const { refetch: refetchRecommendMemberList } = useGetHomeMemberList();

  const { refetch: refetchRecommendRoomList } = useGetHomeRecommendRoomList();

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchMyRoom();
    refetchReceivedRequest();
    refetchSentRequest();
    refetchRandomMemberList();
    refetchRecommendMemberList();
    refetchRecommendRoomList();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${scrollY <= height ? 'bg-subColor1' : 'bg-white'}`}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 120, backgroundColor: '#FFFFFF' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HeaderComponent handleLayout={handleLayout} />

        <View className="bg-white pt-[24px] gap-y-[24px]">
          {/* 라이프스타일이 있을 때만 출력 */}
          {hasLifeStyle && (
            <Fragment>
              <MyRoomComponent />
              <View className="bg-[#F7F9FA] w-full h-[10px]" />
            </Fragment>
          )}

          {/* 방장인 사용자에게만 보이는 방 참여 요청 목록 (타인 -> 방) */}
          {roomInfo.roomId !== 0 && roomInfo.isRoomManager && (
            <Fragment>
              <ReceivedRequestComponent />
              <View className="bg-[#F7F9FA] w-full h-[10px]" />
            </Fragment>
          )}

          {/* 방장이 아닌 사용자에게만 보이는 방 참여 요청 목록 (본인 -> 방) : 참여 요청 있을때만 보임 */}
          {roomInfo.roomId === 0 &&
            data.pages?.flatMap((page) => page.result.result).length !== 0 && (
              <Fragment>
                <SentRequestComponent />
                <View className="bg-[#F7F9FA] w-full h-[10px]" />
              </Fragment>
            )}

          <RecommendRoommateComponent />

          <View className="bg-[#F7F9FA] w-full h-[10px]" />

          <RecommendRoomComponent />
        </View>

        {/* 하단 over-scroll 시의 흰색 배경 설정 */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 200,
            position: 'absolute',
            bottom: -100,
            left: 0,
            right: 0,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
