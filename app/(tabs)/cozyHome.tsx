import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import HeaderComponent from '@/components/cozyHome/header';
import MyRoomComponent from '@/components/cozyHome/myRoom';
import ReceivedRequestComponent from '@/components/cozyHome/receivedRequest';
import RecommendRoomComponent from '@/components/cozyHome/recommendRoom';
import RecommendRoommateComponent from '@/components/cozyHome/recommendRoommate';
import SentRequestComponent from '@/components/cozyHome/sentRequest';
import OpacityPressable from '@/components/opacityPressable';
import { useGetHomeMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useGetReceivedRequestList } from '@/hooks/room/roomManager';
import { useGetSentRequestRoomList } from '@/hooks/room/user';
import { useGetHomeRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useMemberStore } from '@/zustand/store';

export default function CozyHome() {
  const { hasLifeStyle, hasRoom, roomInfo } = useMemberStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { refetch: myRoomRefetch } = useGetMyRoomDetail(roomInfo?.roomId ?? 0);
  const { refetch: receivedRequestRefetch } = useGetReceivedRequestList(
    roomInfo?.isRoomManager ?? false,
  );
  const { refetch: sentRequestRefetch } = useGetSentRequestRoomList(3);
  const { refetch: randomMemberRefetch } = useGetRandomMemberList();
  const { refetch: memberRefetch } = useGetHomeMemberList();
  const { refetch: roomRefetch } = useGetHomeRecommendRoomList();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // 시간 계산용
    const start = Date.now();
    console.log('[onRefresh] start');

    try {
      const tasks: Promise<any>[] = [];

      // 방 유무
      if (!hasRoom) {
        tasks.push(sentRequestRefetch());
      } else if (roomInfo?.roomId !== 0) {
        tasks.push(myRoomRefetch());

        if (roomInfo?.isRoomManager) {
          tasks.push(receivedRequestRefetch());
        }
      }

      // 라이프스타일 유무
      if (!hasLifeStyle) {
        tasks.push(randomMemberRefetch());
      } else {
        tasks.push(memberRefetch());
      }

      // 추천 방
      tasks.push(roomRefetch());

      await Promise.all(tasks);
    } finally {
      const elapsed = Date.now() - start;
      const minDuration = 1000; // 최소 1초 동안은 표시
      const delay = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        console.log(`[onRefresh] done in ${Date.now() - start}ms`);
        setRefreshing(false);
      }, delay);
    }
  }, [
    hasRoom,
    hasLifeStyle,
    roomInfo,
    myRoomRefetch,
    receivedRequestRefetch,
    sentRequestRefetch,
    randomMemberRefetch,
    memberRefetch,
    roomRefetch,
  ]);

  return (
    <View className="flex-1 bg-white">
      <HeaderComponent />

      <ScrollView
        contentContainerStyle={{
          zIndex: 10,
          paddingTop: 36,
          paddingBottom: 120,
          backgroundColor: '#FFFFFF',
          rowGap: 24,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#68A4FF'} />
        }
      >
        {/* 방이 있는 경우 */}
        {hasRoom && roomInfo !== undefined && roomInfo.roomId !== 0 && <MyRoomComponent />}

        {/* 방이 있으면서 방장인 경우 */}
        {hasRoom && roomInfo !== undefined && roomInfo.roomId !== 0 && roomInfo.isRoomManager && (
          <ReceivedRequestComponent />
        )}

        {/* 방이 없고 보낸 요청이 있는 경우 */}
        {!hasRoom && <SentRequestComponent />}

        <RecommendRoommateComponent />

        <RecommendRoomComponent />

        {!hasRoom && (
          <OpacityPressable onPress={() => {}}>
            <View className="mx-[20px] bg-colorBox rounded-xl px-[16px] py-[12px]">
              <Text className="Semibold12 text-basicFont">초대코드로 친구를 찾고 계신가요?</Text>
            </View>
          </OpacityPressable>
        )}
      </ScrollView>
    </View>
  );
}
