import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Pressable,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import ChatIcon from '@assets/feedMain/chatIcon.svg';
import SendCommentIcon from '@assets/feedView/sendCommentIcon.svg';
import DotIcon from '@assets/feedView/dotIcon.svg';

import { FeedViewScreenProps } from '@type/param/loginStack';
import { CommentType, PostCardType } from '@type/feed';

import { exampleCommentList, examplePostList } from '@utils/mockData/exampleList';
import { postTimeUtil } from '@utils/time/timeUtil';

import CommentList from '@components/feedView/commentList';
import ControlModal from '@components/feedView/controlModal';

import { useImageCarousel } from '@hooks/useImageCarousel';
import { usePersonaImage } from '@hooks/usePersonaImage';
import { useFeedModal } from '@hooks/useFeedModal';
import { useButtonModal } from '@hooks/useButtonModal';
import ButtonModal from '@components/common/buttonModal';
import { getDetailPost } from '@server/api/post';
import { useRecoilState } from 'recoil';
import { roomInfoState } from '@recoil/recoil';

const FeedViewScreen = (props: FeedViewScreenProps) => {
  const { postId } = props.route.params;
  const [post, setPost] = React.useState<PostCardType>({
    id: 0,
    writer: {
      id: 0,
      nickname: '',
      persona: 0,
    },
    content: '',
    imageList: [],
    commentCount: 0,
    createdAt: '',
  });
  const [commentList, setCommentList] = React.useState<CommentType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [comment, setComment] = React.useState<string>('');
  const [isMyPost, setIsMyPost] = React.useState<boolean>(true);
  const opacity = useRef(new Animated.Value(1)).current;

  const [roomState, setRoomState] = useRecoilState(roomInfoState);

  const { isButtonModalVisible, handleButtonModalClose, handleButtonModalOpen } = useButtonModal();

  const {
    currentSlide,
    viewWidthRef,
    loadingImages,
    handleScroll,
    handlePostImageLoadStart,
    handlePostImageLoadEnd,
    onLayout,
  } = useImageCarousel(post.imageList);

  const {
    PERSONA_IMAGE_URL,
    loadingProfile,
    handleProfileImageLoadStart,
    handleProfileImageLoadEnd,
  } = usePersonaImage(post.writer.persona);

  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  const handleCommentChange = (comment: string) => {
    setComment(comment);
  };

  const getMyPost = async () => {
    const response = await getDetailPost(17, postId);
    const post = {
      id: response.result.id,
      writer: {
        id: 0,
        nickname: response.result.nickname,
        persona: response.result.persona,
      },
      content: response.result.content,
      imageList: response.result.imageList,
      commentCount: 0,
      createdAt: response.result.createdAt,
    };
    const commentList = response.result.commentList.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      writer: {
        id: 0,
        nickname: comment.nickname,
        persona: comment.persona,
      },
      createdAt: comment.createdAt,
    }));
    setPost(post);
    setCommentList(commentList);
  };

  useEffect(() => {
    getMyPost();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    opacity.setValue(1);
    setPost({
      id: 0,
      writer: {
        id: 0,
        nickname: '',
        persona: 0,
      },
      content: '',
      imageList: [],
      commentCount: 0,
      createdAt: '',
    });
    setCommentList([]);

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: refreshing ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setRefreshing(false);
        setPost(examplePostList[postId - 1]);
        setCommentList(exampleCommentList);
      });
    }, 2000);
  }, []);

  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView className="w-full bg-white" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View key={post.id} className="flex flex-col w-full p-4 px-5 bg-white">
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex flex-row items-center justify-start space-x-2">
              {loadingProfile ||
                (refreshing && (
                  <Animated.View style={{ opacity }}>
                    <SkeletonPlaceholder>
                      <View style={{ width: 32, height: 32, borderRadius: 16 }} />
                    </SkeletonPlaceholder>
                  </Animated.View>
                ))}
              <Image
                className="w-8 h-8 rounded-full"
                onLoadStart={handleProfileImageLoadStart}
                onLoadEnd={handleProfileImageLoadEnd}
                source={{ uri: PERSONA_IMAGE_URL }}
              />
              <View className="flex flex-row items-start">
                {refreshing ? (
                  <SkeletonPlaceholder>
                    <View style={{ width: 'auto', height: 'auto', borderRadius: 4, padding: 0 }}>
                      <Text className="text-sm font-semibold text-emphasizedFont">
                        {post.writer.nickname}
                      </Text>
                    </View>
                  </SkeletonPlaceholder>
                ) : (
                  <Text className="text-sm font-semibold text-emphasizedFont">
                    {post.writer.nickname}
                  </Text>
                )}
              </View>
            </View>
            {isMyPost && !refreshing && (
              <View
                className="flex items-center justify-center"
                ref={dotIconRef}
                onTouchEnd={onPressModalOpen}
              >
                <DotIcon />
              </View>
            )}
          </View>
          {refreshing && (
            <SkeletonPlaceholder>
              <View style={{ width: '100%', height: 20, borderRadius: 4, marginTop: 10 }} />
            </SkeletonPlaceholder>
          )}
          <Text className="mt-2 mb-3 text-sm font-medium text-basicFont">{post.content}</Text>
          {post.imageList.length > 0 && (
            <View onLayout={onLayout} className="w-full">
              <FlatList
                data={post.imageList}
                horizontal
                pagingEnabled
                snapToInterval={viewWidthRef.current}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                onScroll={handleScroll}
                decelerationRate="fast"
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: viewWidthRef.current,
                      height: viewWidthRef.current,
                    }}
                  >
                    {loadingImages[index] && (
                      <SkeletonPlaceholder>
                        <View
                          style={{
                            width: viewWidthRef.current,
                            height: viewWidthRef.current,
                            borderRadius: 12,
                          }}
                        />
                      </SkeletonPlaceholder>
                    )}
                    <Image
                      style={{
                        width: viewWidthRef.current,
                        height: viewWidthRef.current,
                        borderRadius: 12,
                      }}
                      source={{ uri: item }}
                      resizeMode="cover"
                      onLoadStart={() => handlePostImageLoadStart(index)}
                      onLoadEnd={() => handlePostImageLoadEnd(index)}
                    />
                  </View>
                )}
              />

              {post.imageList.length > 1 && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                  {post.imageList.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: currentSlide === index ? '#6C6C77' : '#D9D9D9',
                      }}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
          <View
            className={`flex flex-row items-center justify-between space-x-2 mt-${
              post.imageList.length > 0 ? 4 : 0
            }`}
          >
            <View className="flex flex-row items-center justify-between space-x-2">
              <ChatIcon />
              <Text className="text-xs font-normal text-disabledFont">{post.commentCount}</Text>
            </View>
            <View>
              {refreshing ? (
                <SkeletonPlaceholder>
                  <View style={{ width: 100, height: 20, borderRadius: 10 }} />
                </SkeletonPlaceholder>
              ) : (
                <Text className="text-xs font-normal text-disabledFont">
                  {postTimeUtil(post.createdAt)}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View className="mt-2 w-full border-t-2 border-[#F4F4F4]"></View>
        <CommentList commentCards={commentList} />
      </ScrollView>
      <View className="absolute bottom-0 w-full">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            paddingHorizontal: 20,
          }}
        >
          <TextInput
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChangeText={handleCommentChange}
            className="flex-1 p-3 pr-8 rounded-lg bg-[#F0F0F0] mr-1 mb-10 mt-2"
          />
          <Pressable className="mb-7">
            <SendCommentIcon />
          </Pressable>
        </LinearGradient>
      </View>
      <SafeAreaView className="w-full" />
      <ControlModal
        isModalVisible={isModalVisible}
        modalPosition={modalPosition}
        onSubmit={handleButtonModalOpen}
        onPressModalClose={onPressModalClose}
      />
      <ButtonModal
        title="게시물 삭제하시나요?"
        message="삭제하면 우리들의 추억을 복구할 수 없어요!"
        cancelText="취소"
        submitText="삭제"
        isVisible={isButtonModalVisible}
        closeModal={handleButtonModalClose}
        onSubmit={() => {}}
        buttonCount={2}
      />
    </View>
  );
};

export default FeedViewScreen;
