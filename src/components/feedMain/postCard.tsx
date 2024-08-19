import React, { Fragment } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PostCardType } from '@type/feed/postType';
import { postTimeUtil } from '@utils/time/timeUtil';
import ChatIcon from '@assets/feedMain/chatIcon.svg';

import { useImageCarousel } from '@hooks/useImageCarousel';
import { usePersonaImage } from '@hooks/usePersonaImage';
import { useRecoilState } from 'recoil';
import { profileState } from '@recoil/recoil';

type PostCardProps = {
  post: PostCardType;
  toFeedView: (postId: number) => void;
};

const PostCard = (props: PostCardProps) => {
  const { post, toFeedView } = props;

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

  const [profile, setProfile] = useRecoilState(profileState);
  return (
    <Fragment>
      <TouchableOpacity onPress={() => toFeedView(post.id)}>
        <View
          key={post.id}
          className="z-10 flex flex-col w-full p-4 mb-4 bg-white shadow-sm rounded-xl"
        >
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex flex-row items-center justify-start space-x-2">
              {loadingProfile && (
                <SkeletonPlaceholder>
                  <View style={{ width: 32, height: 32, borderRadius: 16 }} />
                </SkeletonPlaceholder>
              )}
              <Image
                className="w-8 h-8 rounded-full"
                onLoadStart={handleProfileImageLoadStart}
                onLoadEnd={handleProfileImageLoadEnd}
                source={{ uri: PERSONA_IMAGE_URL }}
              />
              <View className="flex flex-row items-center justify-start">
                <Text className="text-sm font-semibold text-emphasizedFont mr-[2px]">
                  {`${post.writer.nickname}`}
                </Text>
                <Text className="text-sm font-semibold text-disabledFont">
                  {post.writer.nickname === profile.nickname ? '(나)' : ''}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-normal text-disabledFont">
              {postTimeUtil(post.createdAt)}
            </Text>
          </View>
          <Text className="mt-2 mb-2 text-sm font-medium text-basicFont">{post.content}</Text>

          {post.imageList.length > 0 && (
            <View onLayout={onLayout} className="w-full">
              <FlatList
                data={post.imageList}
                horizontal
                pagingEnabled
                snapToInterval={viewWidthRef.current}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={200}
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
            className={`flex flex-row items-center justify-start space-x-2 mt-${
              post.imageList.length > 0 ? 4 : 0
            }`}
          >
            <ChatIcon />
            <Text className="text-sm font-normal text-disabledFont">{post.commentCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
};

export default PostCard;
