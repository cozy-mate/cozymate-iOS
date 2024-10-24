import { useRecoilState } from 'recoil';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React, { useRef, Fragment, useEffect, useCallback } from 'react';
import { useAnimatedStyle, useAnimatedKeyboard } from 'react-native-reanimated';
import {
  View,
  Text,
  Image,
  FlatList,
  Keyboard,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated as NativeAnimated,
} from 'react-native';

import BackCleanHeader from 'src/layout/backCleanHeader';

// import { updateComment } from '../../server/api/comment';

import ButtonModal from '@components/common/buttonModal';
import CommentList from '@components/feedView/commentList';
import ControlModal from '@components/feedView/controlModal';

import { useHasRoomStore } from '@zustand/room/room';
import { useProfileStore } from '@zustand/member/member';

import { feedRefreshState, postDetailRefreshState } from '@recoil/recoil';

import { deletePost, getDetailPost } from '@server/api/post';
import { createComment, getCommentList } from '@server/api/comment';

import { useFeedModal } from '@hooks/useFeedModal';
import { useButtonModal } from '@hooks/useButtonModal';
import { usePersonaImage } from '@hooks/usePersonaImage';
import { useImageCarousel } from '@hooks/useImageCarousel';

import { postTimeUtil } from '@utils/time/timeUtil';

import { CommentType, PostCardType } from '@type/feed';
import { FeedViewScreenProps } from '@type/param/stack';

import DotIcon from '@assets/feedView/dotIcon.svg';
import ChatIcon from '@assets/feedMain/chatIcon.svg';
import SendCommentIcon from '@assets/feedView/sendCommentIcon.svg';

const POST_GET_ERROR = '게시글을 불러오는데 실패했습니다.';
const POST_DELETE_SUCCESS = '게시글이 삭제되었습니다.';
const POST_DELETE_ERROR = '게시글 삭제에 실패했습니다.';
const COMMENT_CREATE_ERROR = '댓글 작성에 실패했습니다.';

const FeedViewScreen = (props: FeedViewScreenProps) => {
  const { profile } = useProfileStore();
  const { myRoom } = useHasRoomStore();

  const [, setNeedsPostRefresh] = useRecoilState(feedRefreshState);

  const [needsPostDetailRefresh, setNeedsPostDetailRefresh] =
    useRecoilState(postDetailRefreshState);

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    bottom: keyboard.height.value > 20 ? keyboard.height.value : 20,
  }));

  const { postId } = props.route.params;

  const { navigation } = props;

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
  const [loading, setLoading] = React.useState(false);
  const [comment, setComment] = React.useState<string>('');

  const [oneButtonModalInfo, setOneButtonModalInfo] = React.useState('');
  const [needsToGoBack, setNeedsToGoBack] = React.useState(false);

  const opacity = useRef(new NativeAnimated.Value(1)).current;

  const {
    isButtonModalVisible: isTwoButtonModalVisible,
    handleButtonModalClose: handleTwoButtonModalClose,
    handleButtonModalOpen: handleTwoButtonModalOpen,
  } = useButtonModal();

  const {
    isButtonModalVisible: isOneButtonModalVisible,
    handleButtonModalClose: handleOneButtonModalClose,
    handleButtonModalOpen: handleOneButtonModalOpen,
  } = useButtonModal();

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

  useFocusEffect(
    useCallback(() => {
      if (needsPostDetailRefresh) {
        onRefresh();
        setNeedsPostDetailRefresh(false);
      }
    }, [needsPostDetailRefresh]),
  );

  const getMyPost = async () => {
    setLoading(true);
    try {
      const response = await getDetailPost(myRoom.roomId, postId);
      const post = {
        id: response.result.id,
        writer: {
          id: 0,
          nickname: response.result.nickname,
          persona: response.result.persona,
        },
        content: response.result.content,
        imageList: response.result.imageList,
        commentCount: response.result.commentCount,
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
    } catch (e: any) {
      setOneButtonModalInfo(POST_GET_ERROR);
      setNeedsToGoBack(true);
      setNeedsPostRefresh(true);
      handleOneButtonModalOpen();
    } finally {
      setLoading(false);
    }
  };

  const onOneButtonModalClose = () => {
    handleOneButtonModalClose();
    if (needsToGoBack) {
      setNeedsToGoBack(false);
      navigation.goBack();
    }
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
      NativeAnimated.timing(opacity, {
        toValue: refreshing ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setRefreshing(false);
        getMyPost();
      });
    }, 1000);
  }, []);

  const onDelete = async () => {
    const response = await deletePost(myRoom.roomId, postId);
    if (response) {
      handleTwoButtonModalClose();
      setOneButtonModalInfo(POST_DELETE_SUCCESS);
      setNeedsPostRefresh(true);
      setNeedsToGoBack(true);
    } else {
      handleTwoButtonModalClose();
      setOneButtonModalInfo(POST_DELETE_ERROR);
      handleOneButtonModalOpen();
    }
  };

  const onEdit = () => {
    navigation.navigate('FeedCreateScreen', {
      mode: 'edit',
      postId,
    });
  };

  const [commentPosting, setCommentPosting] = React.useState<boolean>(false);

  const createMyComment = async () => {
    if (comment === '') {
      return;
    }
    setCommentPosting(true);
    const data = {
      roomId: myRoom.roomId,
      postId: postId,
      content: comment,
    };

    try {
      const response = await createComment(data);
      if (response) {
        const responseComment = await getCommentList(myRoom.roomId, postId);
        const commentList = responseComment.result.map((comment: any) => ({
          id: comment.id,
          content: comment.content,
          writer: {
            id: comment.writerId,
            nickname: comment.nickname,
            persona: comment.persona,
          },
          createdAt: comment.createdAt,
        }));
        setCommentList(commentList);
      }
      setComment('');
      Keyboard.dismiss();
    } catch (e: any) {
      setOneButtonModalInfo(COMMENT_CREATE_ERROR);
      handleOneButtonModalOpen();
    } finally {
      setCommentPosting(false);
    }
  };

  const updateCommentList = async () => {
    const response = await getCommentList(myRoom.roomId, postId);
    const commentList = response.result.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      writer: {
        id: comment.writerId,
        nickname: comment.nickname,
        persona: comment.persona,
      },
      createdAt: comment.createdAt,
    }));
    setCommentList(commentList);
  };

  return (
    <View className="h-full w-full bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Fragment>
          <SafeAreaView className="w-full bg-white" />
          <BackCleanHeader onPressBack={() => navigation.goBack()} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View key={post.id} className="mb-6 flex w-full flex-col bg-white px-5 pt-4">
              <View className="flex w-full flex-row items-center justify-between">
                <View className="flex flex-row items-center justify-start space-x-2">
                  {loadingProfile ||
                    refreshing ||
                    (loading && (
                      <NativeAnimated.View style={{ opacity }}>
                        <SkeletonPlaceholder>
                          <View style={{ width: 32, height: 32, borderRadius: 16 }} />
                        </SkeletonPlaceholder>
                      </NativeAnimated.View>
                    ))}
                  <Image
                    className="h-8 w-8 rounded-full"
                    onLoadStart={handleProfileImageLoadStart}
                    onLoadEnd={handleProfileImageLoadEnd}
                    source={{ uri: PERSONA_IMAGE_URL }}
                  />
                  <View className="flex flex-row items-start">
                    {refreshing || loading ? (
                      <SkeletonPlaceholder>
                        <View
                          style={{ width: 'auto', height: 'auto', borderRadius: 4, padding: 0 }}
                        >
                          <Text className="text-sm font-semibold text-emphasizedFont">
                            {post.writer.nickname}
                          </Text>
                        </View>
                      </SkeletonPlaceholder>
                    ) : (
                      <View className="flex flex-row items-center justify-start">
                        <Text className="mr-[2px] text-sm font-semibold text-emphasizedFont">
                          {`${post.writer.nickname}`}
                        </Text>
                        <Text className="text-sm font-semibold text-disabledFont">
                          {post.writer.nickname === profile.nickname ? '(나)' : ''}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                {profile.nickname === post.writer.nickname && !refreshing && !loading && (
                  <View
                    className="flex items-center justify-center"
                    ref={dotIconRef}
                    onTouchEnd={onPressModalOpen}
                  >
                    <DotIcon />
                  </View>
                )}
              </View>
              {refreshing ||
                (loading && (
                  <SkeletonPlaceholder>
                    <View style={{ width: '100%', height: 20, borderRadius: 4, marginTop: 10 }} />
                  </SkeletonPlaceholder>
                ))}
              <Text className="mb-3 mt-2 text-sm font-medium text-basicFont">{post.content}</Text>
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
                    scrollEnabled={post.imageList.length > 1}
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
                className={`flex flex-row items-center justify-between space-x-2 ${
                  post.imageList.length > 0 ? 'mt-4' : 'mt-0'
                }`}
              >
                <View className="flex flex-row items-center justify-between space-x-2">
                  <ChatIcon />
                  <Text className="text-xs font-normal text-disabledFont">{post.commentCount}</Text>
                </View>
                <View>
                  {refreshing || loading ? (
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
            <CommentList
              key={comment}
              commentCards={commentList}
              postId={postId}
              updateComment={updateCommentList}
            />
          </ScrollView>
          <Animated.View className={`absolute z-10 w-full`} style={[animatedStyles]}>
            <View className="flex w-full flex-row items-center justify-center bg-white py-2 pl-4 pr-2">
              <TextInput
                placeholder="댓글을 입력해주세요"
                value={comment}
                onChangeText={handleCommentChange}
                className="mr-1 flex-1 rounded-lg bg-[#F0F0F0] p-3 pr-8"
              />
              <TouchableOpacity
                className={`${loading || commentPosting || refreshing ? 'disabled' : ''}`}
                onPress={createMyComment}
              >
                <SendCommentIcon />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <SafeAreaView className="w-full" />
          <ControlModal
            isModalVisible={isModalVisible}
            modalPosition={modalPosition}
            onSubmit={handleTwoButtonModalOpen}
            onEdit={onEdit}
            onPressModalClose={onPressModalClose}
          />
          <ButtonModal
            title="게시물을 삭제하시나요?"
            message="삭제하면 우리들의 추억을 복구할 수 없어요!"
            cancelText="취소"
            submitText="삭제"
            isVisible={isTwoButtonModalVisible}
            closeModal={handleTwoButtonModalClose}
            onSubmit={onDelete}
            buttonCount={2}
          />
          <ButtonModal
            title={oneButtonModalInfo}
            submitText="확인"
            isVisible={isOneButtonModalVisible}
            closeModal={onPressModalClose}
            onSubmit={onOneButtonModalClose}
            buttonCount={1}
          />
        </Fragment>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FeedViewScreen;
