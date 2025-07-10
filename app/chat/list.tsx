import { Suspense } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatRoomItemComponent from '@/components/chat/chatRoomItem';
import BackHeaderComponent from '@/components/common/backHeader';
import LoadingComponent from '@/components/common/loading';
import { useGetChatRoomList } from '@/hooks/chat-room/chat-room';

function ChatListComponent() {
  const { data, fetchNextPage, hasNextPage } = useGetChatRoomList();

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <FlatList
        contentContainerStyle={
          data.pages.flatMap((page) => page.result.result).length === 0
            ? { flexGrow: 1 }
            : { paddingBottom: 120 }
        }
        className="px-[20px] mt-[32px]"
        data={data?.pages?.flatMap((page) => page.result.result)}
        renderItem={({ item }) => <ChatRoomItemComponent data={item} />}
        ItemSeparatorComponent={() => <View className="bg-[#F6F6F6] h-[1px] my-2" />}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mb-20">
            <Text className="Medium14 text-disabledFont">아직 주고 받은 쪽지가 없어요!</Text>
          </View>
        )}
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

export default function ChatList() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <ChatListComponent />
    </Suspense>
  );
}
