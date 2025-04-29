import { Fragment, Suspense, useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingComponent from '@/components/common/loading';
import HeaderComponent from '@/components/cozyHome/Header';
import MyRoomComponent from '@/components/cozyHome/myRoom';
import ReceivedRequestComponent from '@/components/cozyHome/receivedRequest';
import RecommendRoomComponent from '@/components/cozyHome/recommendRoom';
import RecommendRoommateComponent from '@/components/cozyHome/recommendRoommate';
import SentRequestComponent from '@/components/cozyHome/sentRequest';
import { useGetSentRequestRoomList } from '@/hooks/room/room';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

export default function HomeScreen() {
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { roomInfo } = useHasRoomStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 참여요청을 보낸 목록
  const { data } = useGetSentRequestRoomList();

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
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Suspense
      fallback={
        <Modal transparent={true}>
          <LoadingComponent />
        </Modal>
      }
    >
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
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
}
