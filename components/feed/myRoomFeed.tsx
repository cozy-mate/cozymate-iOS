import { Text, View, FlatList, RefreshControl } from 'react-native';

import { useGetPostList } from '@/hooks/post/post';
import { useMemberStore } from '@/zustand/store';

import { GetPostListResponse } from '../../server/post/response';
import LoadingComponent from '../common/loading';

import { FeedEditButton } from './buttons/feedEditButton';

export default function MyRoomFeed() {
  const { roomInfo } = useMemberStore();
  const { data, isLoading, refetch, isFetching } = useGetPostList({ roomId: roomInfo?.roomId ?? 0 });


  return (
    <View className="flex-1 bg-[#F7FAFF] relative px-5">
      <FlatList<GetPostListResponse['result'][number]>
        ListHeaderComponent={<FeedEditButton className="mt-6" />}
        data={data?.result ?? []}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Text>피드</Text>}
        onRefresh={refetch}
        refreshControl={<RefreshControl refreshing={!isLoading && isFetching} onRefresh={refetch} />}
        refreshing={!isLoading && isFetching}
        ListEmptyComponent={isLoading ? <View className="flex w-full h-full justify-center items-center"><LoadingComponent /></View> : <View className="flex justify-center items-center w-full h-full"><Text>데이터가 없습니다.</Text></View>}
      />
    </View>
  );
}
