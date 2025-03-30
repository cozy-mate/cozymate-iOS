import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import RightArrow from '@/assets/images/common/grayArrow.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useGetChatRoomList } from '@/hooks/chat-room/chat-room';

const ChatListComponent: React.FC = () => {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage } = useGetChatRoomList();

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.result.result)}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/chat/${item.chatRoomId}`)}
          className="py-3 flex flex-row justify-between items-center"
        >
          <View className="gap-y-[12px]">
            <View className="flex flex-row items-center gap-x-1.5">
              {getPersona(item.persona, 24, 24)}
              <Text className="text-14 font-500 text-colorFont">{item.nickname}</Text>
            </View>

            <Text className="text-14 font-500 text-basicFont">{item.lastContent}</Text>
          </View>

          <View className="w-[40px] h-[40px] flex items-center justify-center">
            <RightArrow />
          </View>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View className="bg-[#F6F6F6] h-[1px] my-2" />}
      onEndReached={loadMoreList}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ChatListComponent;
