import React, {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View,TextInput,Text,Pressable } from 'react-native'

import { FeedEditScreenProps } from "@type/param/loginStack"

const FeedEditScreen = (props: FeedEditScreenProps) => {

  const [feedName, setFeedName] = useState<string>('');
  const [feedDescription, setFeedDescription] = useState<string>('');

  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  useEffect(() => {
    if (feedName !== '' && feedDescription !== '') {
      setIsComplete(true);
    }else{
      setIsComplete(false);
    }
  }, [feedName, feedDescription]);

  const valueHandleNameChange = (text: string) => {
    setFeedName(text);
  };
  const valueHandleDescriptionChange = (text: string) => {
    setFeedDescription(text);
  };

  return (
    <SafeAreaView className="flex-1 flex-col bg-white pl-8 pr-8 pt-8 w-full h-full">
      <View className='flex-1 flex-col'>
        <Text className='text-md mb-2 font-semibold text-emphasizedFont'>피드 이름을 입력해주세요.</Text>
        <TextInput
            placeholder="내용를 입력해주세요"
            value={feedName}
            onChangeText={valueHandleNameChange}
            className="w-full p-4 pr-8 bg-colorBox text-basicFont rounded-xl mb-12"
          />
        <Text className='text-md mb-2 font-semibold text-emphasizedFont'>피드 설명을 입력해주세요.</Text>
        <TextInput
            placeholder="내용를 입력해주세요"
            value={feedDescription}
            onChangeText={valueHandleDescriptionChange}
            className="w-full p-4 pr-8 bg-colorBox text-basicFont rounded-xl"
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

export default FeedEditScreen