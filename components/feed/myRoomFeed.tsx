import { Text, View, FlatList, RefreshControl } from 'react-native';

import { useGetPostList } from '@/hooks/post/post';
import { GetPostListResponse } from '@/server/post/response';
import { useMemberStore } from '@/zustand/store';


import { FeedEditButton } from './buttons/feedEditButton';
import { PostListCard } from './cards/postCard';
import PostListCardSkeleton from './cards/postCardSkeleton';

export default function MyRoomFeed() {
  const { roomInfo } = useMemberStore();
  const { data, isLoading, refetch, isFetching } = useGetPostList({ roomId: roomInfo?.roomId ?? 0 });

  const samplePost = [{
    id: 1,
    writerId: 1,
    content: 'test',
    nickname: '제이',
    persona: 1,
    createdAt: '2021-01-01T00:00:00.000Z',
    imageList: ['https://fastly.picsum.photos/id/328/200/300.jpg?hmac=rUU8GIGsrhqhqkiTi6qIQXtGstAUmnv4yV1bc_Sns7w', 'https://fastly.picsum.photos/id/328/200/300.jpg?hmac=rUU8GIGsrhqhqkiTi6qIQXtGstAUmnv4yV1bc_Sns7w'],
    commentCount: 0,
  },
  {
    id: 2,
    writerId: 2,
    content: 'test',
    nickname: '제이',
    persona: 1,
    createdAt: '2021-01-01T00:00:00.000Z',
    imageList: ['https://fastly.picsum.photos/id/328/200/300.jpg?hmac=rUU8GIGsrhqhqkiTi6qIQXtGstAUmnv4yV1bc_Sns7w', 'https://fastly.picsum.photos/id/328/200/300.jpg?hmac=rUU8GIGsrhqhqkiTi6qIQXtGstAUmnv4yV1bc_Sns7w'],
    commentCount: 0,
  }
  ]

  return (
    <View className="flex-1 bg-[#F7FAFF] relative px-5">
      <FlatList<GetPostListResponse['result'][number]>
        ListHeaderComponent={<FeedEditButton className="mt-6 mb-[30px]" />}
        data={data?.result ?? samplePost}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <PostListCard post={item} />}
        onRefresh={refetch}
        refreshControl={<RefreshControl refreshing={!isLoading && isFetching} onRefresh={refetch} />}
        refreshing={!isLoading && isFetching}
        ListEmptyComponent={isLoading ?
          <PostListCardSkeleton /> :
          <View className="flex justify-center items-center w-full h-full">
            <Text className='Medium14 text-disabledFont'>아직 시작된 우리의 이야기가 없어요!</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
      />
    </View >
  );
}
