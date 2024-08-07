import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, Text, View } from 'react-native'

import FeedLampDisabled from '@assets/feedMain/feedLampDisabled.svg'
import FeedLampEnabled from '@assets/feedMain/feedLampEnabled.svg'
import FeedEdit from '@assets/feedMain/feedEdit.svg'
import PostEdit from '@assets/feedMain/postEdit.svg'

import { FeedMainScreenProps } from '@type/param/stack'
import FeedList from '@components/feedMain/feedList'

const FeedMainScreen = ({navigation}: FeedMainScreenProps) => {

  // TODO : useEffect로 미리 불러와야할 정보들
  // - 피드 정보가 들어있는지 여부
  // - 피드 정보(이름, 설명)
  // - 게시물 불러오기 줘야 할 정보 - Member의 Room Or University
  // - 게시물 정보(작성자, 내용, 이미지, 좋아요 수, 댓글 수, 작성 시간)

  // TODO : Type 미리 정의하기
  // 

  const [isFeedEnabled, setIsFeedEnabled] = React.useState(false);

  const toFeedEdit = () => {
    navigation.navigate('FeedEditScreen')
  }

  const toFeedCreate = () => {
    navigation.navigate('FeedCreateScreen')
  }

  return (
      <SafeAreaView className="flex-1 flex-col bg-white pl-8 pr-8 pt-8 w-full h-full">
          <View className="flex-col bg-white">
            {
              isFeedEnabled ? <FeedLampEnabled className="mb-2"/> : <FeedLampDisabled className="mb-2"/>
            }
            <View className='flex-row bg-white items-center'>
              <Text className="text-lg font-extrabold text-disabledFont">피드의 이름을 설정해주세요.</Text>
              <Pressable onPress={toFeedEdit}>
                <FeedEdit/>
              </Pressable>
            </View>
            <Text className="text-sm font-semibold text-disabledFont">피드 설명을 입력해주세요</Text>
          </View>
          <View className="flex-1 flex-col bg-white w-full items-center justify-center pl-5 pr-5">
            <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
            <FeedList/>
          </View>

          <View>
            <Pressable 
                className="absolute bottom-3 right-3 items-center justify-centerp-4 rounded-xl"
                onPress={toFeedCreate}>
              <PostEdit className="mr-2"/>
            </Pressable>
          </View>

      </SafeAreaView>
  )
}

export default FeedMainScreen