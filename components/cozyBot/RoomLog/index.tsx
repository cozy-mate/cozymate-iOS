import { ScrollView, Text, View } from 'react-native';

import Bot from '@/assets/images/cozyBot/bot.svg';
import { useGetRoomLog } from '@/hooks/room-log/room-log';

const RoomLogComponent = () => {
  const { data, fetchNextPage, hasNextPage } = useGetRoomLog();

  // 무한 스크롤
  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="bg-white flex-1 py-8 px-[20px] rounded-t-[40px]">
      <ScrollView onScrollEndDrag={loadMoreList}>
        {data?.pages?.flatMap((page) =>
          page.result.result.map((item, index) => (
            <View key={index} className="px-1 py-4">
              <Bot />
              <Text className="Medium14 text-basicFont mt-2 mb-0.5">
                {item.content.split(/(\{.*?\})/g).map((part, idx) =>
                  part.startsWith('{') && part.endsWith('}') ? (
                    <Text key={idx} className="text-mainColor font-600">
                      {part.slice(1, -1)}
                    </Text>
                  ) : (
                    <Text key={idx} className="text-basicFont">
                      {part}
                    </Text>
                  ),
                )}
              </Text>
              <Text className="Regular12 text-[#ACADB4]">{item.createdAt}</Text>
            </View>
          )),
        )}
      </ScrollView>
    </View>
  );
};

export default RoomLogComponent;
