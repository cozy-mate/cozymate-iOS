import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { TextInput, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XHeaderComponent from '@/components/common/xHeader';
import BottomButtonComponent from '@/components/myPage/bottomButton';
import { useSendChat } from '@/hooks/chat/chat';

export default function SendChat() {
  const { id, chatRoomId, nickname } = useLocalSearchParams();

  const [content, setContent] = useState<string>('');

  const { mutateAsync: sendChat } = useSendChat(Number(id), Number(chatRoomId));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[24px]">
        <XHeaderComponent />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 24 }}
          keyboardShouldPersistTaps="handled"
        >
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
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonComponent
        buttonText="쪽지 보내기"
        onPress={() => sendChat({ content })}
        disabled={content === ''}
        color={content === '' ? 'GRAY' : 'BLUE'}
      />
    </SafeAreaView>
  );
}
