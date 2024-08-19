import React, { useEffect, useState, useCallback, useRef, Fragment } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View, RefreshControl, FlatList } from 'react-native';

import FeedLampDisabled from '@assets/feedMain/feedLampDisabled.svg';
import FeedLampEnabled from '@assets/feedMain/feedLampEnabled.svg';
import FeedEdit from '@assets/feedMain/feedEdit.svg';
import PostEdit from '@assets/feedMain/postEdit.svg';

import { FeedMainScreenProps } from '@type/param/roomStack';
import { FeedType, PostCardType } from '@type/feed';
import { useRecoilState } from 'recoil';
import { feedRefreshState, hasRoomState, roomInfoState } from '@recoil/recoil';
import { getFeedData } from '@server/api/feed';
import PostCard from '@components/feedMain/postCard';
import { getPostList } from '@server/api/post';

const FeedMainScreen = ({ navigation, route }: FeedMainScreenProps) => {
  // TODO : 복잡하게 섞인 코드 정리하기
  // TODO : RecoilState RoomId 업데이트 되면 적용하기
  const [roomInfo, setRoomInfo] = useRecoilState(hasRoomState);
  const [needsRefresh, setNeedsRefresh] = useRecoilState(feedRefreshState);

  const [feedInfo, setFeedInfo] = React.useState<FeedType>({
    name: '',
    description: '',
    isEnabled: false,
  });

  const [postList, setPostList] = React.useState<PostCardType[]>([]);
  const [postStates, setPostStates] = useState({
    page: 0,
    stop: false,
    loading: false,
    refreshing: false,
  });

  // FeedInfo 불러오기
  const getFeedInfo = async () => {
    try {
      const response = await getFeedData(roomInfo.roomId);
      setFeedInfo({
        name: response.result.name,
        description: response.result.description,
        isEnabled: response.result.name !== '' && response.result.description !== '',
      });
    } catch (e: any) {
      if (e.response.data.code === 'FEED401') {
        setFeedInfo({ name: '', description: '', isEnabled: false });
      }
    }
  };

  useEffect(() => {
    getFeedInfo();
    getPosts(0);
  }, []);

  useEffect(() => {
    if (needsRefresh) {
      setPostStates((prev) => ({ ...prev, page: 0, stop: false, refreshing: true }));
      handleRefresh();
    }
  }, [needsRefresh]);

  const handleRefresh = async () => {
    getFeedInfo();
    getPosts(0);
    setPostStates((prev) => ({ ...prev, refreshing: false }));
    setNeedsRefresh(false);
  };

  const getPosts = async (page: number) => {
    try {
      if (postStates.stop || postStates.loading) {
        return;
      }

      setPostStates((prev) => ({ ...prev, loading: true }));

      const response = await getPostList(roomInfo.roomId, page);
      const posts: PostCardType[] = response.result.map((post) => ({
        id: post.id,
        content: post.content,
        writer: {
          id: post.writerId,
          nickname: post.nickname,
          persona: post.persona,
        },
        imageList: post.imageList,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
      }));

      if (page === 0) {
        setPostList([...posts]);
      } else {
        setPostList((prevPosts) => [...prevPosts, ...posts]);
      }
      if (response.result.length < 10) {
        // 빈 배열, 혹은 10개 미만의 배열이 오면 더 이상 불러올 데이터가 없다고 판단
        setPostStates((prev) => ({ ...prev, stop: true }));
      }
    } catch (e: any) {
      setPostList([]);
      setPostStates((prev) => ({ ...prev, stop: true }));
    } finally {
      setPostStates((prev) => ({ ...prev, loading: false }));
    }
  };

  const onEndReached = () => {
    if (!postStates.stop && !postStates.loading && !postStates.refreshing) {
      setPostStates((prev) => ({ ...prev, page: prev.page + 1 }));
      getPosts(postStates.page + 1);
    }
  };

  // navigation들
  const toFeedEdit = () => {
    navigation.navigate('FeedEditScreen', { mode: feedInfo.isEnabled ? 'edit' : 'create' });
  };

  const toFeedCreate = () => {
    navigation.navigate('FeedCreateScreen', { mode: 'create' });
  };

  const toFeedView = (postId: number) => {
    navigation.navigate('FeedViewScreen', { postId: postId });
  };

  const onRefresh = () => {
    getFeedInfo();
    setPostStates((prev) => ({ ...prev, page: 0, stop: false, refreshing: true }));
    getPosts(0);
    setPostStates((prev) => ({ ...prev, refreshing: false }));
  };

  const renderFooter = () => {
    if (!postStates.loading) return null;

    return (
      <View className="py-4">
        <Text className="text-sm text-disabledFont">로딩 중...</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View className="flex-col justify-start w-screen px-5 mb-5">
      {feedInfo.isEnabled ? (
        <FeedLampEnabled className="mb-2" />
      ) : (
        <FeedLampDisabled className="mb-2" />
      )}
      <View className="flex-row items-center">
        {feedInfo.isEnabled ? (
          <Text className="text-lg font-semibold text-basicFont">{feedInfo.name}</Text>
        ) : (
          <Text className="text-lg font-semibold text-disabledFont">
            피드의 이름을 설정해주세요.
          </Text>
        )}
        <Pressable onPress={toFeedEdit}>
          <FeedEdit />
        </Pressable>
      </View>
      {feedInfo.isEnabled ? (
        <Text className="text-xs font-normal text-basicFont">{feedInfo.description}</Text>
      ) : (
        <Text className="text-xs font-normal text-disabledFont">피드 설명을 입력해주세요</Text>
      )}
    </View>
  );

  return (
    <Fragment>
      <SafeAreaView />
      <FlatList
        data={postList}
        renderItem={({ item }) => <PostCard post={item} toFeedView={toFeedView} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          postStates.loading ? (
            <View className="items-center justify-center flex-1 mt-10">
              <Text className="text-sm text-disabledFont">이야기를 불러오는 중입니다...</Text>
            </View>
          ) : postStates.page === 0 ? (
            <View className="items-center justify-center flex-1">
              <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
            </View>
          ) : (
            <View></View>
          )
        }
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
        refreshControl={<RefreshControl refreshing={postStates.refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
      />
      <View>
        <Pressable
          className="absolute items-center justify-center p-4 bottom-14 right-3 rounded-xl"
          onPress={toFeedCreate}
        >
          <PostEdit className="" />
        </Pressable>
      </View>
    </Fragment>
  );
};

export default FeedMainScreen;
