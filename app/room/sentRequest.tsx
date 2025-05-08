import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useGetSentRequestRoomList } from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';

export default function SentRequest() {
  const router = useRouter();

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
        renderItem={({ item }) => (
          <Pressable
            key={item.roomId}
            onPress={() => router.push(`/room/${item.roomId}`)}
            className="p-[16px] gap-y-[8px] border border-disabledColor rounded-xl"
          >
            <View className="flex flex-row gap-x-[8px]">
              {item.hashtagList.map((hash, index) => (
                <View key={index} className="bg-colorBox rounded px-[8px] py-[2px]">
                  <Text className="text-12 font-500 leading-12 text-colorFont">#{hash}</Text>
                </View>
              ))}
            </View>

            <Text className="text-16 font-600 leading-16 text-emphasizedFont">{item.name}</Text>

            <View className="flex flex-row justify-between items-center">
              <Text className="text-12 font-500 leading-12 text-disabledFont">
                <Text className="text-mainColor">{item.arrivalMateNum}명</Text>의 룸메이트가 있어요
              </Text>

              <Text
                className={`text-16 font-500 leading-16 ${item.equality !== null && item.equality > 50 ? 'text-mainColor' : 'text-colorFont'} `}
              >
                {item.equality ?? '?? '}%
              </Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <View className="gap-y-[20px] mb-[16px]">
            <BackHeaderComponent />
            <View className="flex flex-row justify-between items-center">
              <View className="gap-y-[4px] mx-[4px]">
                <Text className="text-18 font-600 text-emphasizedFont">
                  {memberState.nickname}님이
                </Text>
                <Text className="text-18 font-600 text-emphasizedFont">
                  참여요청을 보낸 방이에요
                </Text>
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
