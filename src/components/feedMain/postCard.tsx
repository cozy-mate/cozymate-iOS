import React, { Fragment, useEffect, useState,useRef } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import ChatIcon from '@assets/feedMain/chatIcon.svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { PostCardType } from '../../type/feed/postType';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PostCardProps = {
  post: PostCardType;
}

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
  const { post } = props;
  const PERSONA_IMAGE_URL = `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${post.writer.persona}.png`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingImages, setLoadingImages] = useState<boolean[]>(Array(post.imageList.length).fill(false));
  const [loadingProfile, setLoadingProfile] = useState(true);

  const viewWidthRef = useRef(0);
  const [layoutMeasured, setLayoutMeasured] = useState(false);

  

  useEffect(() => {
    console.log('loadingImages', loadingImages);
  }, [loadingImages]);

  const handleProfileImageLoadStart = () => {
    setLoadingProfile(true);
  };

  const handleProfileImageLoadEnd = () => {
    setLoadingProfile(false);
  };

  const handlePostImageLoadStart = (index: number) => {
    setLoadingImages((prev) => {
      let updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handlePostImageLoadEnd = (index: number) => {
    setLoadingImages((prev) => {
      let updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };
  const onLayout = (event: any) => {
    if (!layoutMeasured) {
      const { width } = event.nativeEvent.layout;
      viewWidthRef.current = width;
      setLayoutMeasured(true);
    }
  };

  return (
    <Fragment>
      <TouchableOpacity>
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
            <Text className="text-disabledFont font-normal text-sm">{timeUtil(post.createdAt)}</Text>
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  {post.imageList.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: currentSlide === index ? '#6C6C6C' : '#C9C9C9',
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
