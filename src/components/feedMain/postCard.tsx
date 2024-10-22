import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View, Text, Image, FlatList, Pressable } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import { usePersonaImage } from '@hooks/usePersonaImage';
import { useImageCarousel } from '@hooks/useImageCarousel';

import { postTimeUtil } from '@utils/time/timeUtil';

import { PostCardType } from '@type/feed/postType';

import ChatIcon from '@assets/feedMain/chatIcon.svg';

type PostCardProps = {
  post: PostCardType;
  toFeedView: (postId: number) => void;
};

const PostCard = (props: PostCardProps) => {
  const { profile } = useProfileStore();

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

  const { PERSONA_IMAGE_URL } = usePersonaImage(post.writer.persona);

  return (
    <TouchableOpacity onPress={() => toFeedView(post.id)}>
      <View
        key={post.id}
        className="z-10 mb-4 flex w-full flex-col rounded-xl bg-white p-4 shadow-sm"
      >
        <View className="flex w-full flex-row items-center justify-between">
          <View className="flex flex-row items-center justify-start space-x-2">
            <Image className="h-8 w-8 rounded-full" source={{ uri: PERSONA_IMAGE_URL }} />
            <View className="flex flex-row items-center justify-start">
              <Text className="mr-[2px] text-sm font-semibold text-emphasizedFont">
                {`${post.writer.nickname}`}
              </Text>
              <Text className="text-sm font-semibold text-disabledFont">
                {post.writer.nickname === profile.nickname ? '(나)' : ''}
              </Text>
            </View>
          </View>
          <Text className="text-xs font-normal text-disabledFont">
            {postTimeUtil(post.createdAt)}
          </Text>
        </View>
        <Text className="my-2 text-sm font-medium text-basicFont">{post.content}</Text>

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
              scrollEnabled={post.imageList.length > 1}
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
                  <Pressable onPress={() => toFeedView(post.id)}>
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
                  </Pressable>
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
          className={`flex flex-row items-center justify-start space-x-2
            ${post.imageList.length > 0 ? 'mt-4' : 'mt-0'}`}
        >
          <ChatIcon />
          <Text className="text-sm font-normal text-disabledFont">{post.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
