import React, { useRef, useState, Fragment, useEffect } from 'react';
import { Text, View, FlatList, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRecoilState } from 'recoil';
import PostCard from '@components/feedMain/postCard';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@components/feedMain/header';
import Footer from '@components/feedMain/footer';
import { useGetFeedInfo } from '@hooks/api/feed';
import { useGetPostList } from '@hooks/api/post';
import { hasRoomState, feedRefreshState } from '@recoil/recoil';

import { FeedMainScreenProps } from '@type/param/stack';

import PostEdit from '@assets/feedMain/postEdit.svg';

const FeedMainScreen = ({ navigation }: FeedMainScreenProps) => {
  const { bottom } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const [roomInfo, setRoomInfo] = useRecoilState(hasRoomState);
  const [needsRefresh, setNeedsRefresh] = useRecoilState(feedRefreshState);

  const flatListRef = useRef<FlatList>(null);

  const {
    data: feedInfo,
    isLoading: isFeedLoading,
    refetch: refetchFeed,
  } = useGetFeedInfo(roomInfo.roomId);

  const {
    data: postList,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetPostList(roomInfo.roomId);

  useEffect(() => {
    if (needsRefresh) {
      refetch();
      refetchFeed();
      flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
      setNeedsRefresh(false);
    }
  }, [needsRefresh, refetch]);

  useFocusEffect(
    React.useCallback(() => {
      if (needsRefresh) {
        refetch();
        refetchFeed();
      }
    }, [needsRefresh, refetch]),
  );

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['feedInfo', roomInfo.roomId] });
    await queryClient.invalidateQueries({ queryKey: ['postList', roomInfo.roomId] });
    setNeedsRefresh(false);
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  };

  const onEndReached = () => {
    if (hasNextPage && !isPostsLoading) {
      fetchNextPage();
    }
  };

  const toFeedCreate = () => {
    navigation.navigate('FeedCreateScreen', { mode: 'create' });
  };

  const toFeedView = (postId: number) => {
    navigation.navigate('FeedViewScreen', { postId: postId });
  };

  return (
    <Fragment>
      <SafeAreaView />
      <FlatList
        ref={flatListRef}
        data={postList?.pages.flat()}
        renderItem={({ item }) => <PostCard post={item} toFeedView={toFeedView} />}
        ListHeaderComponent={<Header feedInfo={feedInfo} navigation={navigation} />}
        ListEmptyComponent={
          isPostsLoading ? (
            <View className="items-center justify-center flex-1 mt-10">
              <Text className="text-sm text-disabledFont">이야기를 불러오는 중입니다...</Text>
            </View>
          ) : postList?.pages[0]?.length === 0 ? (
            <View className="items-center justify-center flex-1">
              <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
            </View>
          ) : (
            <View></View>
          )
        }
        ListFooterComponent={<Footer isPostsLoading={isPostsLoading} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
          paddingBottom: bottom + 20,
        }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
      />

      <Pressable
        onPress={toFeedCreate}
        className="fixed z-20 flex items-end bottom-28 right-5 w-fit"
      >
        <PostEdit />
      </Pressable>
    </Fragment>
  );
};

export default FeedMainScreen;
