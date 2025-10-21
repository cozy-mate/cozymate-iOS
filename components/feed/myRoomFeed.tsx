import { useRouter } from 'expo-router';
import { Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import EditButton from '@/assets/images/feed/createFeed.svg';
import { useGetPostList } from '@/hooks/post/post';
import { GetPostListResponse } from '@/server/post/response';
import { useMemberStore } from '@/zustand/store';

import OpacityPressable from '../opacityPressable';

import { FeedEditButton } from './buttons/feedEditButton';
import { PostListCard } from './cards/postCard';
import PostListCardSkeleton from './cards/postCardSkeleton';

export default function MyRoomFeed() {
  const router = useRouter();
  const { roomInfo } = useMemberStore();
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostList({ roomId: roomInfo.roomId });

  const posts = data?.pages?.flatMap((page: GetPostListResponse) => page.result.result) ?? [];
  return (
    <View className="flex-1 bg-[#F7FAFF] relative px-5">
      <FlatList<GetPostListResponse['result']['result'][number]>
        ListHeaderComponent={<FeedEditButton className="mt-6 mb-[30px]" />}
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostListCard post={item} onPress={() => router.push(`/feed/${item.id}`)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListEmptyComponent={(() => {
          if (isError) {
            return (
              <View className="flex justify-center items-center w-full h-full">
                <Text className="Medium14 text-disabledFont">피드를 불러오는데 실패했어요</Text>
              </View>
            );
          }
          if (isLoading) {
            return <PostListCardSkeleton />;
          }
          return (
            <View className="flex justify-center items-center w-full h-full">
              <Text className="Medium14 text-disabledFont">
                아직 시작된 우리의 이야기가 없어요!
              </Text>
            </View>
          );
        })()}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View className="h-20 justify-center items-center">
            {isFetchingNextPage ? <ActivityIndicator /> : null}
          </View>
        )}
      />
      <OpacityPressable
        className="absolute bottom-[100px] right-[20px]"
        onPress={() => router.push('/feed/create')}
      >
        <EditButton />
      </OpacityPressable>
    </View>
  );
}
