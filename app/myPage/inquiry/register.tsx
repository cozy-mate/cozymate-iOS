import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/myPage/bottomButton';
import InputComponent from '@/components/myPage/input';
import MultiLineInputComponent from '@/components/myPage/multiLineInput';
import { useCreateInquiry } from '@/hooks/inquiry/inquiry';

export default function Inquiry() {
  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { mutateAsync: createInquiry } = useCreateInquiry();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            rowGap: 40,
            paddingTop: 8,
            paddingBottom: 120,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <MultiLineInputComponent
            title={'문의 내용을 입력해주세요'}
            value={content}
            setValue={setContent}
            placeholder="내용을 입력해주세요"
            height="h-[258px]"
          />

          <InputComponent
            title={'답변 내용을 받으실\n이메일을 입력해주세요'}
            value={email}
            setValue={setEmail}
            placeholder="이메일을 입력해주세요"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonComponent
        buttonText="등록"
        onPress={() => createInquiry({ content, email })}
        disabled={content === '' || email === ''}
        color={content === '' || email === '' ? 'GRAY' : 'BLUE'}
      />
    </SafeAreaView>
  );
}
