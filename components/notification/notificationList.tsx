import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';

import { useGetNotificationLog } from '@/hooks/notification/notification';

const NotificationListComponent: React.FC = () => {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage } = useGetNotificationLog();

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const toRoute = (category: string, content: string, targetId: number) => {
    if (category === '초대요청') {
      // 방 (방장) -> 유저 : 유저 입장
      if (content.includes('나를 초대했어요')) {
        router.push(`/room/${targetId}`);
      }
      // 방 (방장) -> 유저 : 방장 입장
      else if (content.includes('초대 요청을 보냈어요')) {
        router.push(`/user/${targetId}`);
      }
      // 방 (방장) -> 유저 : 유저가 수락했을 때 방장
      else if (content.includes('방 초대 요청을 수락했어요')) {
        router.push(`/user/${targetId}`);
      }
      // 방 (방장) -> 유저 : 유저가 거절했을 때 방장
      else if (content.includes('초대 요청을 거절했어요')) {
        router.push(`/user/${targetId}`);
      }
    } else if (category === '방 참여요청') {
      // 유저 -> 방 (방장) : 방장 입장
      if (content.includes('이 방 참여 요청을 보냈어요')) {
        router.push(`/user/${targetId}`);
      }
      // 유저 -> 방 (방장) : 유저 입장
      else if (content.includes('에게 방 참여 요청을 보냈어요')) {
        router.push(`/room/${targetId}`);
      }
      // 유저 -> 방 (방장) : 방장이 수락했을 때 유저
      else if (content.includes('방 참여 요청을 수락했어요')) {
        router.push(`/user/${targetId}`);
      }
      // 유저 -> 방 (방장) : 방장이 수락했을 때 유저
      else if (content.includes('방 참여 요청을 거절했어요')) {
        router.push(`/user/${targetId}`);
      }
    }
  };

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.result.result)}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() => toRoute(item.category, item.content, item.targetId)}
          underlayColor="#E5F0FF"
        >
          <View className="p-[20px] gap-y-[6px]">
            <View className="flex flex-row justify-between">
              <Text className="Semibold12 text-mainColor">{item.category}</Text>
              <Text className="Medium12 text-disabledFont">{item.createdAt}</Text>
            </View>

            <Text className="Medium14 text-emphasizedFont">{item.content}</Text>
          </View>
        </TouchableHighlight>
      )}
      ItemSeparatorComponent={() => <View className="bg-[#F6F6F6] h-[1px]" />}
      onEndReached={loadMoreList}
      onEndReachedThreshold={0.5}
    />
  );
};

export default NotificationListComponent;
