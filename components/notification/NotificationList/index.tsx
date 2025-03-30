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

  const toRoute = (category: string, targetId: number) => {
    if (category === '초대요청') {
      router.replace(`/room/${targetId}`);
    } else if (category === '방 참여요청') {
      router.replace(`/user/${targetId}`);
    } else if (category === '방') {
      router.replace(`/(tabs)/cozyBot`);
    }
  };

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.result.result)}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() => toRoute(item.category, item.targetId)}
          underlayColor="#E5F0FF"
        >
          <View className="p-5 gap-y-1.5">
            <View className="flex flex-row justify-between">
              <Text className="text-12 font-600 text-mainColor">{item.category}</Text>
              <Text className="text-12 font-500 text-disabledFont">{item.createdAt}</Text>
            </View>

            <Text className="text-14 font-500 text-emphasizedFont">{item.content}</Text>
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
