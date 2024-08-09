import React, { useEffect, useState,useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, Text, View,RefreshControl } from 'react-native'
import PostList from '@components/feedMain/postList'
import {examplePostList} from './exampleList';

import FeedLampDisabled from '@assets/feedMain/feedLampDisabled.svg'
import FeedLampEnabled from '@assets/feedMain/feedLampEnabled.svg'
import FeedEdit from '@assets/feedMain/feedEdit.svg'
import PostEdit from '@assets/feedMain/postEdit.svg'

import { FeedMainScreenProps } from "@type/param/loginStack"
import { FeedType, PostCardType } from '@type/feed';
import { ScrollView } from 'react-native-gesture-handler'

const FeedInfo = () => {
  return
}

const FeedMainScreen = ({navigation}: FeedMainScreenProps) => {

  // TODO : useEffect로 미리 불러와야할 정보들
  // - 피드 정보가 들어있는지 여부
  // - 피드 정보(이름, 설명)
  // - 게시물 불러오기 줘야 할 정보 - Member의 Room Or University
  // - 게시물 정보(작성자, 내용, 이미지, 좋아요 수, 댓글 수, 작성 시간)

  // TODO : 게시물 Type 미리 정의하기

  const [isFeedEnabled, setIsFeedEnabled] = React.useState(false);

  const [feedInfo, setFeedInfo] = React.useState<FeedType>({
    name: '피그말리온',
    description: '집에 안 들어오면 죽는다...',
  });

  const [refreshing, setRefreshing] = useState(false);

  const [postList, setPostList] = React.useState<PostCardType[]>(examplePostList);

  // Feed 초기화
  // TODO : hook으로 만들기 (재사용 높음)
  useEffect(() => {
    if(feedInfo.name !== '' && feedInfo.description !== ''){
      setIsFeedEnabled(true);
    }else{
      setIsFeedEnabled(false);
    }
  },[feedInfo]);
    

  const toFeedEdit = () => {
    navigation.navigate('FeedEditScreen')
  }

  const toFeedCreate = () => {
    navigation.navigate('FeedCreateScreen')
  }

  const toFeedView = (postId: number) => {
    navigation.navigate('FeedViewScreen',{postId: postId})
  }
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPostList([]);
    setTimeout(() => {
      setRefreshing(false);
      setPostList(examplePostList);
    }, 2000);
  }, []);

  return (
      <SafeAreaView className="flex-1 flex-col bg-main3 pl-8 pr-8 pt-8 w-full h-full">
        <ScrollView contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
          <View className="flex-col w-full justify-start">
            {
              isFeedEnabled ? <FeedLampEnabled className="mb-2"/> : <FeedLampDisabled className="mb-2"/>
            }
            <View className='flex-row items-center'>
              {
                isFeedEnabled ? 
                <Text className="text-lg font-semibold text-basicFont">{feedInfo.name}</Text> 
                : <Text className="text-lg font-semibold text-disabledFont">피드의 이름을 설정해주세요.</Text>
              }
              <Pressable onPress={toFeedEdit}>
                <FeedEdit/>
              </Pressable>
            </View>
            {
              isFeedEnabled ? 
              <Text className="text-xs font-normal text-basicFont">{feedInfo.description}</Text> 
              : <Text className="text-xs font-normal text-disabledFont">피드 설명을 입력해주세요</Text>
            }
          </View>
            {postList.length > 0 ?
              <PostList postCards={postList} toFeedView={toFeedView}/> 
              : 
              <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
            }
        </ScrollView>
          <View>
            <Pressable 
                className="absolute bottom-20 right-3 items-center justify-centerp-4 rounded-xl"
                onPress={toFeedCreate}>
              <PostEdit className="mr-2"/>
            </Pressable>
          </View>
        
      </SafeAreaView>
  )
}

export default FeedMainScreen