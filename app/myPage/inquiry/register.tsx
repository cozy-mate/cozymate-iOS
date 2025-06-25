import { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

      <KeyboardAwareScrollView
        contentContainerStyle={{
          rowGap: 40,
          paddingTop: 8,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
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
      </KeyboardAwareScrollView>

      <BottomButtonComponent
        buttonText="등록"
        onPress={() => createInquiry({ content, email })}
        disabled={content === '' || email === ''}
        color={content === '' || email === '' ? 'GRAY' : 'BLUE'}
      />
    </SafeAreaView>
  );
}
