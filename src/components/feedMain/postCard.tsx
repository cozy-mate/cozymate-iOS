import React, { Fragment} from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import ChatIcon from '@assets/feedMain/chatIcon.svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { PostCardType } from '@type/feed/postType';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { postTimeUtil } from '@utils/time/timeUtil';
import { useImageCarousel } from '@hooks/useImageCarousel';
import { usePersonaImage } from '@hooks/usePersonaImage';

type PostCardProps = {
  post: PostCardType;
  toFeedView : (postId : number) => void;
}

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
  

  return (
    <Fragment>
      <TouchableOpacity onPress={()=>toFeedView(post.id)}>
        <View key={post.id} className="flex flex-col w-full bg-white mb-4 p-4 rounded-xl z-10 shadow-sm">
          <View className="flex flex-row w-full items-center justify-between">
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
              <Text className="text-emphasizedFont font-semibold text-sm">{post.writer.nickname}</Text>
            </View>
            <Text className="text-disabledFont font-normal text-sm">{postTimeUtil(post.createdAt)}</Text>
          </View>
          <Text className="text-basicFont font-medium text-sm mt-2 mb-2">{post.content}</Text>
          
          {post.imageList.length > 0 && (
            <View 
              onLayout={onLayout}
              className='w-full'>
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
                        <View style={{ width: viewWidthRef.current, height: viewWidthRef.current, borderRadius: 12 }} />
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
          <View className={`flex flex-row items-center justify-start space-x-2 mt-${post.imageList.length > 0 ? 4 : 0}`}>
            <ChatIcon />
            <Text className="text-disabledFont font-normal text-sm">{post.commentCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
};

export default PostCard;
