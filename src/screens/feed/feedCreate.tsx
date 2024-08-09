import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, View,Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import PostImage from '@assets/feedCreate/postImage.svg'

import { FeedCreateScreenProps } from '@type/param/loginStack'



const FeedCreateScreen = (props: FeedCreateScreenProps) => {

  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [imageCount, setImageCount] = React.useState<number>(0);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  useEffect(() => {
    if (postDescription !== '') {
      setIsComplete(true);
    }else{
      setIsComplete(false);
    }
  }, [postDescription]);

  const valueHandleDescriptionChange = (text: string) => {
    setPostDescription(text);
  };

  return (
    <SafeAreaView className="flex-1 flex-col bg-white pl-8 pr-8 pt-8 w-full h-full">
      <View className="flex items-center justify-center h-20 w-20 rounded-xl bg-colorBox mb-4">
          <Pressable >
            <PostImage className="mb-2"/>
            <Text className='text-sm text-disabledFont'>
              {`${imageCount}/${MAX_IMAGE_COUNT}`}
            </Text>
          </Pressable>
        </View>
      <View className='flex-1 flex-col items-center justify-start mb-4'>
        <TextInput
            placeholder="내용를 입력해주세요"
            value={postDescription}
            onChangeText={valueHandleDescriptionChange}
            multiline ={true}
            className="w-full p-4 pr-8 h-2/3 bg-colorBox text-basicFont rounded-xl"
            textAlignVertical='top'
            numberOfLines={20}
          />
      </View>
      <View className="flex">
          <Pressable className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}  p-4 rounded-xl`}>
            <Text className="text-base font-semibold text-center text-white">확인</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default FeedCreateScreen