import { Suspense, useCallback, useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingComponent from '@/components/common/loading';
import OverScrollView from '@/components/common/overScrollView';
import HeaderComponent from '@/components/cozyHome/header';
import MyRoomComponent from '@/components/cozyHome/myRoom';
import ReceivedRequestComponent from '@/components/cozyHome/receivedRequest';
import RecommendRoomComponent from '@/components/cozyHome/recommendRoom';
import RecommendRoommateComponent from '@/components/cozyHome/recommendRoommate';
import SentRequestComponent from '@/components/cozyHome/sentRequest';
import { useGetHomeMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useCheckHasRoom, useGetMyRoomDetail } from '@/hooks/room/room';
import { useGetReceivedRequestList } from '@/hooks/room/roomManager';
import { useGetSentRequestRoomList } from '@/hooks/room/user';
import { useGetHomeRecommendRoomList } from '@/hooks/room-recommend/room-recommend';

function CozyHomeComponent() {
  const { data: hasRoom } = useCheckHasRoom();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const refetchFuncs = [
    useGetMyRoomDetail(hasRoom.result.roomId).refetch(),
    useGetReceivedRequestList(hasRoom.result.isRoomManager).refetch(),
    useGetSentRequestRoomList(3).refetch(),
    useGetRandomMemberList().refetch(),
    useGetHomeMemberList().refetch(),
    useGetHomeRecommendRoomList().refetch(),
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all(refetchFuncs).finally(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${scrollY <= 175 ? 'bg-subColor1' : 'bg-white'}`}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 120, backgroundColor: '#FFFFFF' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#68A4FF'} />
        }
      >
        <HeaderComponent />
        <View className="bg-white pt-[24px] gap-y-[24px]">
          <MyRoomComponent />
          <ReceivedRequestComponent />
          <SentRequestComponent />
          <RecommendRoommateComponent />
          <RecommendRoomComponent />
        </View>

        {/* 하단 over-scroll 시의 흰색 배경 설정 */}
        <OverScrollView backgroundColor="#FFFFFF" height={200} bottom={-100} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function CozyHome() {
  return (
    <Suspense
      fallback={
        <Modal visible={true} transparent={true}>
          <LoadingComponent />
        </Modal>
      }
    >
      <CozyHomeComponent />
    </Suspense>
  );
}
