import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import PostImage from '@assets/feedCreate/postImage.svg';

import { FeedCreateScreenProps } from '@type/param/loginStack';

const FeedCreateScreen = (props: FeedCreateScreenProps) => {
  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [imageCount, setImageCount] = React.useState<number>(0);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  useEffect(() => {
    if (postDescription !== '') {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [postDescription]);

  const valueHandleDescriptionChange = (text: string) => {
    setPostDescription(text);
  };

  return (
    <SafeAreaView className="flex-col flex-1 w-full h-full pt-8 pl-8 pr-8 bg-white">
      <View className="flex items-center justify-center w-20 h-20 mb-4 rounded-xl bg-colorBox">
        <Pressable>
          <PostImage className="mb-2" />
          <Text className="text-sm text-disabledFont">{`${imageCount}/${MAX_IMAGE_COUNT}`}</Text>
        </Pressable>
      </View>
      <View className="flex-col items-center justify-start flex-1 mb-4">
        <TextInput
          placeholder="내용를 입력해주세요"
          value={postDescription}
          onChangeText={valueHandleDescriptionChange}
          multiline={true}
          className="w-full p-4 pr-8 h-2/3 bg-colorBox text-basicFont rounded-xl"
          textAlignVertical="top"
          numberOfLines={20}
        />
      </View>
      <View className="flex">
        <Pressable className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}  p-4 rounded-xl`}>
          <Text className="text-base font-semibold text-center text-white">확인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FeedCreateScreen;
