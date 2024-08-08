import React, { Fragment } from 'react'
import { View, Text, Image, ScrollView, Dimensions} from 'react-native'
import PersonaExample from '@assets/feedMain/personaExample.svg';
import ChatIcon from '@assets/feedMain/chatIcon.svg';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { PostCardType } from '../../type/feed/postType';
type PostCardProps = {
  post: PostCardType;
  postIndex: number;
  loadingStates: boolean[][];
  handleImageLoadStart: (postIndex: number, imageIndex: number) => void;
  handleImageLoadEnd: (postIndex: number, imageIndex: number) => void;
};

const timeUtil = (time: string) => {
  const postedDate = new Date(time);
  const postedTime = postedDate.getTime();
  const now = new Date();
  const nowTime = now.getTime();
  const diff = nowTime - postedTime;
  const diffMin = diff / 60000;
  const diffHour = diffMin / 60;
  const diffDay = diffHour / 24;
  
  if (diffMin < 60) {
    return `${Math.floor(diffMin)}분 전`;
  } else if (diffHour < 24) {
    return `${Math.floor(diffHour)}시간 전`;
  } else if (diffDay < 4) {
    return `${Math.floor(diffDay)}일 전`;
  }
  return `${postedDate.getFullYear()}년 ${postedDate.getMonth() + 1}월 ${postedDate.getDate()}일`;
};


const PostCard = (props: PostCardProps) => {

  const { post, postIndex,loadingStates,handleImageLoadStart,handleImageLoadEnd } = props;

  const [itemWidth, setItemWidth] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentSlideIndex = Math.round(offsetX / itemWidth);
    setCurrentSlide(currentSlideIndex);
  };

  return (
    <Fragment>
    <View key={post.id} className="flex flex-col w-full bg-white mb-4 p-4 rounded-xl z-10 shadow-sm">
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center justify-start space-x-2">
        <PersonaExample />
        <Text className="text-emphasizedFont font-medium text-sm">{post.writer.nickname}</Text>
      </View>
      <Text className="text-disabledFont font-normal text-sm">{timeUtil(post.createdAt)}</Text>
    </View>
    <Text className="text-emphasizedFont font-medium text-xs mt-2 mb-2">{post.content}</Text>
    {post.imageList.length > 0 ? (
      <View>
        <ScrollView
          className="flex-1 py-2 rounded-xl"
          horizontal
          pagingEnabled
          contentContainerStyle={{ width: `${100 * post.imageList.length}%` }}
          scrollEventThrottle={200}
          decelerationRate="fast"
          onContentSizeChange={(contentWidth) => setItemWidth(contentWidth / post.imageList.length)}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => handleScroll(event)}
        >
          {post.imageList.map((image, imageIndex) => (
            <View 
              key={imageIndex} 
              style={{ 
                width: itemWidth, 
                height: 300, 
                justifyContent: 'center', 
                alignItems: 'center',
              }}
              className='rounded-xl p-1'
            >
              {loadingStates[postIndex][imageIndex] && (
                <SkeletonPlaceholder>
                  <View style={{ width: 300, height: 300, borderRadius: 12 }} />
                </SkeletonPlaceholder>
              )}
              <Image
                style={{ 
                  width: itemWidth, 
                  height: 300, 
                  display: loadingStates[postIndex][imageIndex] ? 'none' : 'flex', 
                  borderRadius: 12, 
                }}
                source={{ uri: image }}
                resizeMode="cover"
                onLoadStart={() => handleImageLoadStart(postIndex, imageIndex)}
                onLoadEnd={() => handleImageLoadEnd(postIndex, imageIndex)}
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
              />
            </View>
          ))}
        </ScrollView>
        {post.imageList.length > 1 ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {post.imageList.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: currentSlide === index ? '#6C6C77' : '#C9C9C9',
              }}
            />
          ))}
          </View>
        ):null}
      </View>
    ) : null}
    <View className="flex flex-row items-center justify-start space-x-2">
      <ChatIcon />
      <Text className="text-disabledFont font-normal text-sm">{post.commentCount}</Text>
    </View>
  </View>
  </Fragment>
  )
}

export default PostCard