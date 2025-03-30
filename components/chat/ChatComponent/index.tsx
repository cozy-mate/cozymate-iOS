import { FlatList, Text, View } from 'react-native';

import { useGetChatRoomDetail } from '@/hooks/chat/chat';
import { useMemberStore } from '@/zustand/member/member';

interface ChatComponentProps {
  id: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ id }) => {
  const { data, fetchNextPage, hasNextPage } = useGetChatRoomDetail(id);

  const { memberState } = useMemberStore();

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.result.result.content)}
      renderItem={({ item }) => (
        <View className="gap-y-1">
          <View className="gap-y-1.5">
            <Text
              className={`text-16 font-600 ${item.nickname !== memberState.nickname ? 'text-mainColor' : 'text-colorFont'} `}
            >
              {item.nickname}
            </Text>
            <Text className="text-14 font-500 text-basicFont">{item.content}</Text>
          </View>
          <Text className="text-12 font-400 text-disabledFont">{item.datetime}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View className="bg-[#F1F2F4] h-[1px] my-[18px]" />}
      onEndReached={loadMoreList}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ChatComponent;
