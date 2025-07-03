import { Suspense } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import LoadingComponent from '@/components/common/loading';
import SimpleRoomItem from '@/components/common/roomItem/simpleRoomItem';
import { useGetSentRequestRoomList } from '@/hooks/room/user';
import { useMemberStore } from '@/zustand/member/member';

function SentRequestComponent() {
  const { memberState } = useMemberStore();

  const { data, hasNextPage, fetchNextPage } = useGetSentRequestRoomList(5);

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="px-[20px]"
        data={data.pages?.flatMap((page) => page.result.result)}
        renderItem={({ item }) => <SimpleRoomItem key={item.roomId} roomData={item} />}
        ListHeaderComponent={() => (
          <View className="gap-y-[20px] mb-[16px]">
            <BackHeaderComponent />
            <View className="flex flex-row justify-between items-center">
              <View className="gap-y-[4px] mx-[4px]">
                <Text className="Semibold18 text-emphasizedFont">{memberState.nickname}님이</Text>
                <Text className="Semibold18 text-emphasizedFont">참여요청을 보낸 방이에요</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-[12px]" />}
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

export default function SentRequest() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <SentRequestComponent />
    </Suspense>
  );
}
