import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { SimpleRoomCard, SimpleRoomCardSkeleton } from '@/components/common/room';
import { useGetSentRequestRoomList } from '@/hooks/room/user';
import { RoomDetailItem } from '@/type/room';
import { useMemberStore } from '@/zustand/store';

export default function SentRequest() {
  const { memberInfo } = useMemberStore();

  const { data, hasNextPage, fetchNextPage } = useGetSentRequestRoomList(5);
  const rooms = data?.pages?.flatMap((page) => page.result.result) ?? [];
  const skeletonData = Array.from({ length: 3 }, (_, i) => i);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList<RoomDetailItem | number>
        className="px-[20px]"
        data={!data ? skeletonData : rooms}
        keyExtractor={(item, index) =>
          !data ? `skeleton-${index}` : `room-${(item as RoomDetailItem).roomId}`
        }
        renderItem={({ item }) =>
          !data ? <SimpleRoomCardSkeleton /> : <SimpleRoomCard data={item as RoomDetailItem} />
        }
        ListHeaderComponent={() => (
          <View className="gap-y-[20px] mb-[16px]">
            <BackHeaderComponent />
            <View className="flex flex-row justify-between items-center">
              <View className="gap-y-[4px] mx-[4px]">
                <Text className="Semibold18 text-emphasizedFont">
                  {memberInfo?.nickname ?? ''}님이
                </Text>
                <Text className="Semibold18 text-emphasizedFont">참여요청을 보낸 방이에요</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-[12px]" />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
