import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButton from '@/components/common/bottomButton';
import XHeaderComponent from '@/components/common/xHeader';
import { useSendChat } from '@/hooks/chat/chat';

export default function SendChat() {
  const { id, nickname } = useLocalSearchParams();

  const [content, setContent] = useState<string>('');

  const { mutateAsync: sendChat } = useSendChat(Number(id));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px] gap-y-[24px]">
          <XHeaderComponent />

          <View className="gap-y-[12px]">
            <Text className="text-18 font-600 leading-18 text-basicFont mx-[8px]">
              {nickname}님에게
            </Text>

            <TextInput
              value={content}
              onChangeText={(e: string) => setContent(e)}
              multiline={true}
              className="min-h-[320px] bg-colorBox rounded-xl p-[20px]"
              placeholder="내용을 입력해주세요"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="쪽지 보내기"
          disabled={content === ''}
          onPress={() => sendChat({ content })}
        />
      </View>
    </SafeAreaView>
  );
}
