import React, { useEffect, useState,useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, Text, View,RefreshControl } from 'react-native'
import PostList from '@components/feedMain/postList'

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
    name: '',
    description: '',
  });

  const [refreshing, setRefreshing] = useState(false);

  const examplePostList : PostCardType[] = [
    {
      id: 1,
      content: '이것은 테스트 게시물입니다.',
      writer : {
          id: 3,
          nickname: '테스터3',
          persona: 3
      },
      imageList : [],
      commentCount: 4,
      createdAt: '2024-08-08T10:00:00',
      updatedAt: '2021-09-09T00:00:00',
    },
    {
      id: 2,
      content: '이것은 테스트 게시물입니다.',
      writer : {
          id: 1,
          nickname: '테스터',
          persona: 1,
      },
      imageList : ['https://picsum.photos/300/300','https://picsum.photos/400/300','https://picsum.photos/100/300'],
      commentCount: 0,
      createdAt: '2024-08-07T10:00:00',
      updatedAt: '2021-09-09T00:00:00',
    },
    {
      id: 3,
      content: '이것은 두번째 테스트 게시물입니다.',
      writer : {
          id: 2,
          nickname: '테스터2',
          persona: 2,
      },
      imageList : ['https://picsum.photos/200/300'],
      commentCount: 0,
      createdAt: '2024-08-06T10:00:00',
      updatedAt: '2021-09-09T00:00:00',
    }
  ]

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
                <Text className="text-2xl font-extrabold text-black">{feedInfo.name}</Text> 
                : <Text className="text-2xl font-extrabold text-disabledFont">피드의 이름을 설정해주세요.</Text>
              }
              <Pressable onPress={toFeedEdit}>
                <FeedEdit/>
              </Pressable>
            </View>
            {
              isFeedEnabled ? 
              <Text className="text-sm font-semibold text-black">{feedInfo.description}</Text> 
              : <Text className="text-sm font-semibold text-disabledFont">피드 설명을 입력해주세요</Text>
            }
          </View>
          
            {postList.length > 0 ?
              <PostList postCards={postList}/> 
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