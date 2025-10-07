import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import XButton from '@/assets/images/common/xButton.svg';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomTextarea from '@/components/common/customInput/customTextarea';
import { useSendMessage } from '@/hooks/message/message';

export default function SendMessage() {
  const { id, messageRoomId, nickname } = useLocalSearchParams();

  const router = useRouter();

  const [content, setContent] = useState<string>('');

  const { mutateAsync: sendMessage } = useSendMessage(Number(id), Number(messageRoomId));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px] gap-y-[24px]">
          <View className="mt-[8px] flex flex-row justify-end items-center">
            <Pressable
              onPress={() => router.back()}
              className="w-[40px] h-[40px] flex items-center justify-center"
            >
              <XButton />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <CustomTextarea
          title={`${nickname}님에게`}
          value={content}
          handleValue={(e: string) => setContent(e)}
          placeholder="내용을 입력해주세요"
          height="h-[320px]"
        />
      </KeyboardAwareScrollView>

      <BottomButtonComponent
        buttonText="쪽지 보내기"
        onPress={() => sendMessage({ content })}
        disabled={content === '' || content.length > 200}
        color={content === '' || content.length > 200 ? 'GRAY' : 'BLUE'}
      />
    </SafeAreaView>
  );
}
