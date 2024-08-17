import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View, RefreshControl, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import FeedLampDisabled from '@assets/feedMain/feedLampDisabled.svg';
import FeedLampEnabled from '@assets/feedMain/feedLampEnabled.svg';
import FeedEdit from '@assets/feedMain/feedEdit.svg';
import PostEdit from '@assets/feedMain/postEdit.svg';

import { FeedMainScreenProps } from '@type/param/loginStack';
import { FeedType, PostCardType } from '@type/feed';
import { useRecoilState } from 'recoil';
import { roomInfoState } from '@recoil/recoil';
import { getFeedData } from '@server/api/feed';
import PostCard from '@components/feedMain/postCard';
import { getPostList } from '@server/api/post';

const FeedMainScreen = ({ navigation }: FeedMainScreenProps) => {
  // TODO : useEffect로 미리 불러와야할 정보들
  // - 피드 정보가 들어있는지 여부
  // - 피드 정보(이름, 설명)
  // - 게시물 불러오기 줘야 할 정보 - Member의 Room Or University
  // - 게시물 정보(작성자, 내용, 이미지, 좋아요 수, 댓글 수, 작성 시간)

  // TODO : 게시물 Type 미리 정의하기

  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

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
      const response = await getFeedData(roomInfo.roomId === 0 ? 17 : roomInfo.roomId);
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
  }, []);

  const getPosts = async (page: number) => {
    //
    if (postStates.stop || postStates.loading) {
      return;
    }
    console.log('page called');
    setPostStates((prev) => ({ ...prev, loading: true }));

    try {
      const response = await getPostList(roomInfo.roomId === 0 ? 17 : roomInfo.roomId, page);

      console.log(response.result.length);

      const posts: PostCardType[] = response.result.map((post) => ({
        id: post.id,
        content: post.content,
        writer: {
          id: 0,
          nickname: post.nickname,
          persona: post.persona,
        },
        imageList: post.imageList,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
      }));

      setPostList((prevPosts) => [...prevPosts, ...posts]);
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
    if (!postStates.stop && !postStates.loading) {
      setPostStates((prev) => ({ ...prev, page: prev.page + 1 }));
    }
    getPosts(postStates.page);
  };

  // navigation들
  const toFeedEdit = () => {
    navigation.navigate('FeedEditScreen');
  };

  const toFeedCreate = () => {
    navigation.navigate('FeedCreateScreen');
  };

  const toFeedView = (postId: number) => {
    navigation.navigate('FeedViewScreen', { postId: postId });
  };

  const onRefresh = () => {
    setPostStates((prev) => ({ ...prev, page: 0, stop: false, refreshing: true }));
    setPostList([]);
    getPosts(0);
    setPostStates((prev) => ({ ...prev, refreshing: false }));
  };

  const isInitialMount = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        setPostStates({
          page: 0,
          stop: false,
          loading: true,
          refreshing: false,
        });
        setPostList([]);
        getFeedInfo();
        getPosts(0);
      }
    }, []),
  );

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
    <SafeAreaView className="relative w-full h-full pt-8 bg-main3">
      <FlatList
        data={postList}
        renderItem={({ item }) => <PostCard post={item} toFeedView={toFeedView} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          postStates.loading ? (
            <View className="items-center justify-center flex-1">
              <Text className="text-sm text-disabledFont">이야기를 불러오는 중입니다...</Text>
            </View>
          ) : (
            <View className="items-center justify-center flex-1">
              <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
            </View>
          )
        }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingBottom: 50,
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
    </SafeAreaView>
  );
};

export default FeedMainScreen;
